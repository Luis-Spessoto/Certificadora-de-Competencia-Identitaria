// ─── MateriaisCard ────────────────────────────────────────────────────────────
// Cartão para gerenciar materiais de apoio de um tema (upload/link/exclusão).
// Danilo Augusto

import { useRef, useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Paperclip, Link2, Trash2, Upload, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { temasService } from "@/services/temasService";
import type { MaterialApoio, Tema } from "@/types/tema";

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatBytes(bytes?: number): string {
  if (!bytes) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

const tipoIcone: Record<MaterialApoio["tipo"], React.ReactNode> = {
  pdf: <Paperclip className="h-4 w-4 text-red-500" />,
  imagem: <Paperclip className="h-4 w-4 text-blue-500" />,
  video: <Paperclip className="h-4 w-4 text-purple-500" />,
  link: <Link2 className="h-4 w-4 text-green-500" />,
  outro: <Paperclip className="h-4 w-4 text-muted-foreground" />,
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  tema: Tema;
}

// ─── Componente ───────────────────────────────────────────────────────────────
export function MateriaisCard({ tema }: Props) {
  const qc = useQueryClient();
  const fileRef = useRef<HTMLInputElement>(null);

  // estado do formulário de link
  const [linkNome, setLinkNome] = useState("");
  const [linkUrl, setLinkUrl] = useState("");
  const [modoAdicionar, setModoAdicionar] = useState<"arquivo" | "link" | null>(
    null,
  );

  // ─── Mutations ──────────────────────────────────────────────────────────────
  const invalidar = () => {
    qc.invalidateQueries({ queryKey: ["tema", tema.id] });
    qc.invalidateQueries({ queryKey: ["temas"] });
  };

  const adicionarMutation = useMutation({
    mutationFn: (material: Omit<MaterialApoio, "id" | "adicionadoEm">) =>
      temasService.addMaterial(tema.id, material),
    onSuccess: () => {
      invalidar();
      toast.success("Material adicionado");
      setLinkNome("");
      setLinkUrl("");
      setModoAdicionar(null);
    },
    onError: (err) =>
      toast.error(err instanceof Error ? err.message : "Erro ao adicionar"),
  });

  const removerMutation = useMutation({
    mutationFn: (materialId: string) =>
      temasService.removeMaterial(tema.id, materialId),
    onSuccess: () => {
      invalidar();
      toast.success("Material removido");
    },
    onError: () => toast.error("Erro ao remover material"),
  });

  // ─── Handlers ───────────────────────────────────────────────────────────────
  function handleArquivo(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validação de tamanho (máx. 10 MB)
    const MAX_BYTES = 10 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      toast.error("Arquivo muito grande. Máximo permitido: 10 MB.");
      e.target.value = "";
      return;
    }

    // Lê como base64 (mock) — na integração real, enviar FormData para a API
    const reader = new FileReader();
    reader.onload = () => {
      const tipo = detectarTipo(file.type);
      adicionarMutation.mutate({
        nome: file.name,
        url: reader.result as string,
        tipo,
        tamanhoBytes: file.size,
      });
    };
    reader.onerror = () => toast.error("Falha ao ler o arquivo.");
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function handleLink() {
    if (!linkNome.trim()) {
      toast.error("Informe o nome do link.");
      return;
    }
    if (!linkUrl.trim() || !isValidUrl(linkUrl)) {
      toast.error("Informe uma URL válida (ex.: https://...).");
      return;
    }
    adicionarMutation.mutate({
      nome: linkNome.trim(),
      url: linkUrl.trim(),
      tipo: "link",
    });
  }

  function detectarTipo(mimeType: string): MaterialApoio["tipo"] {
    if (mimeType === "application/pdf") return "pdf";
    if (mimeType.startsWith("image/")) return "imagem";
    if (mimeType.startsWith("video/")) return "video";
    return "outro";
  }

  function isValidUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  // ─── Render ─────────────────────────────────────────────────────────────────
  const carregando =
    adicionarMutation.isPending || removerMutation.isPending;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base">Materiais de apoio</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            disabled={carregando}
            onClick={() =>
              setModoAdicionar(modoAdicionar === "arquivo" ? null : "arquivo")
            }
          >
            <Upload className="h-3.5 w-3.5" />
            Arquivo
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5"
            disabled={carregando}
            onClick={() =>
              setModoAdicionar(modoAdicionar === "link" ? null : "link")
            }
          >
            <Link2 className="h-3.5 w-3.5" />
            Link
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* ── Formulário de upload de arquivo ── */}
        {modoAdicionar === "arquivo" && (
          <div className="rounded-lg border border-dashed border-border p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              Selecione um arquivo (PDF, imagem, vídeo) — máx. 10 MB.
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.png,.jpg,.jpeg,.gif,.mp4,.mov,.pptx,.docx,.xlsx"
              className="hidden"
              onChange={handleArquivo}
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              disabled={adicionarMutation.isPending}
              onClick={() => fileRef.current?.click()}
            >
              {adicionarMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Escolher arquivo"
              )}
            </Button>
          </div>
        )}

        {/* ── Formulário de link externo ── */}
        {modoAdicionar === "link" && (
          <div className="rounded-lg border border-border p-4 space-y-3">
            <div className="space-y-1.5">
              <Label>Nome do recurso</Label>
              <Input
                value={linkNome}
                onChange={(e) => setLinkNome(e.target.value)}
                placeholder="Ex.: Slides da aula"
              />
            </div>
            <div className="space-y-1.5">
              <Label>URL</Label>
              <Input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                type="url"
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                disabled={adicionarMutation.isPending}
                onClick={handleLink}
              >
                {adicionarMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Adicionar"
                )}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setModoAdicionar(null)}
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* ── Lista de materiais ── */}
        {tema.materiaisApoio.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            Nenhum material de apoio adicionado ainda.
          </p>
        ) : (
          <ul className="space-y-2">
            {tema.materiaisApoio.map((mat) => (
              <li
                key={mat.id}
                className="flex items-center justify-between rounded-md border border-border bg-card px-3 py-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  {tipoIcone[mat.tipo]}
                  <div className="min-w-0">
                    <a
                      href={mat.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium truncate hover:underline block"
                    >
                      {mat.nome}
                    </a>
                    {mat.tamanhoBytes && (
                      <span className="text-xs text-muted-foreground">
                        {formatBytes(mat.tamanhoBytes)}
                      </span>
                    )}
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7 shrink-0 text-destructive hover:text-destructive"
                  disabled={removerMutation.isPending}
                  onClick={() => {
                    if (confirm(`Remover "${mat.nome}"?`))
                      removerMutation.mutate(mat.id);
                  }}
                  aria-label="Remover material"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
