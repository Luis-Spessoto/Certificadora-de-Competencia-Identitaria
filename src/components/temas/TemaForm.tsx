// ─── TemaForm ─────────────────────────────────────────────────────────────────
// Formulário de criação/edição de tema de oficina.
// Padrão: react-hook-form + zod, igual ao TutorForm.tsx (João).
// Danilo Augusto

import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Tema, TemaInput } from "@/types/tema";

// ─── Schema de validação ──────────────────────────────────────────────────────
const tecnologiaSchema = z.object({ valor: z.string().trim().min(1) });

const schema = z.object({
  titulo: z
    .string()
    .trim()
    .min(3, "Mínimo 3 caracteres")
    .max(120, "Máximo 120 caracteres"),
  descricaoPedagogica: z
    .string()
    .trim()
    .min(10, "Descreva melhor a proposta pedagógica (mín. 10 caracteres)")
    .max(2000),
  nivel: z.enum(["basico", "intermediario", "avancado"]),
  status: z.enum(["rascunho", "publicado", "arquivado"]),
  tecnologias: z
    .array(tecnologiaSchema)
    .min(1, "Adicione ao menos uma tecnologia"),
});

export type TemaFormValues = z.infer<typeof schema>;

// ─── Props ────────────────────────────────────────────────────────────────────
interface Props {
  defaultValues?: Partial<Tema>;
  onSubmit: (data: TemaInput) => Promise<void> | void;
  submitLabel?: string;
}

// ─── Componente ───────────────────────────────────────────────────────────────
export function TemaForm({
  defaultValues,
  onSubmit,
  submitLabel = "Salvar",
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TemaFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      titulo: defaultValues?.titulo ?? "",
      descricaoPedagogica: defaultValues?.descricaoPedagogica ?? "",
      nivel: defaultValues?.nivel ?? "basico",
      status: defaultValues?.status ?? "rascunho",
      tecnologias:
        (defaultValues?.tecnologias ?? []).map((v) => ({ valor: v })) || [
          { valor: "" },
        ],
    },
  });

  // campo dinâmico para a lista de tecnologias
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tecnologias",
  });

  async function handleFormSubmit(values: TemaFormValues) {
    const payload: TemaInput = {
      titulo: values.titulo,
      descricaoPedagogica: values.descricaoPedagogica,
      nivel: values.nivel,
      status: values.status,
      tecnologias: values.tecnologias.map((t) => t.valor).filter(Boolean),
      materiaisApoio: defaultValues?.materiaisApoio ?? [],
    };
    await onSubmit(payload);
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmit)}>
      {/* Título */}
      <Field label="Título da oficina" error={errors.titulo?.message}>
        <Input
          {...register("titulo")}
          placeholder="Ex.: Lógica de Programação com Scratch"
        />
      </Field>

      {/* Descrição pedagógica */}
      <Field
        label="Descrição pedagógica"
        error={errors.descricaoPedagogica?.message}
        hint="Objetivos de aprendizagem, metodologia e público-alvo."
      >
        <Textarea
          {...register("descricaoPedagogica")}
          rows={5}
          placeholder="Descreva os objetivos, a metodologia e o público-alvo da oficina..."
          className="resize-y"
        />
      </Field>

      {/* Nível e Status lado a lado */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nível">
          <Select
            value={watch("nivel")}
            onValueChange={(v) =>
              setValue("nivel", v as TemaFormValues["nivel"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="basico">Básico</SelectItem>
              <SelectItem value="intermediario">Intermediário</SelectItem>
              <SelectItem value="avancado">Avançado</SelectItem>
            </SelectContent>
          </Select>
        </Field>

        <Field label="Status">
          <Select
            value={watch("status")}
            onValueChange={(v) =>
              setValue("status", v as TemaFormValues["status"])
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="publicado">Publicado</SelectItem>
              <SelectItem value="arquivado">Arquivado</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>

      {/* Tecnologias */}
      <div className="space-y-2">
        <Label>Tecnologias utilizadas</Label>
        {errors.tecnologias?.root && (
          <p className="text-xs text-destructive">
            {errors.tecnologias.root.message}
          </p>
        )}
        {/* Caso o zod lance erro no array inteiro */}
        {errors.tecnologias?.message && (
          <p className="text-xs text-destructive">
            {errors.tecnologias.message}
          </p>
        )}

        <div className="space-y-2">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <Input
                {...register(`tecnologias.${index}.valor`)}
                placeholder="Ex.: Arduino IDE, Python, Scratch..."
                className="flex-1"
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  aria-label="Remover tecnologia"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          className="gap-1.5"
          onClick={() => append({ valor: "" })}
        >
          <Plus className="h-3.5 w-3.5" />
          Adicionar tecnologia
        </Button>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}

// ─── Helper Field ─────────────────────────────────────────────────────────────
function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
