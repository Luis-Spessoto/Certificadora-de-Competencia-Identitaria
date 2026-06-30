import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { register } from "@/services/authService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/cadastro")({
  head: () => ({ meta: [{ title: "Cadastro de Tutor — ELLP" }] }),
  component: CadastroPage,
});

function CadastroPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "", email: "", telefone: "", curso: "", matricula: "", senha: "",
  });
  const [loading, setLoading] = useState(false);

  function update<K extends keyof typeof form>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await register(form);
      toast.success("Cadastro enviado! Aguarde aprovação do coordenador.");
      navigate({ to: "/login" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no cadastro");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-4 rounded-lg border border-border bg-card p-6">
        <div>
          <h1 className="text-xl font-semibold">Cadastro de tutor</h1>
          <p className="text-sm text-muted-foreground">
            Após o envio, seu cadastro ficará pendente de aprovação pelo coordenador.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5 md:col-span-2">
            <Label>Nome completo</Label>
            <Input value={form.nome} onChange={(e) => update("nome", e.target.value)} required maxLength={120} />
          </div>
          <div className="space-y-1.5">
            <Label>E-mail</Label>
            <Input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label>Telefone</Label>
            <Input value={form.telefone} onChange={(e) => update("telefone", e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Curso</Label>
            <Input value={form.curso} onChange={(e) => update("curso", e.target.value)} required />
          </div>
          <div className="space-y-1.5">
            <Label>Matrícula</Label>
            <Input value={form.matricula} onChange={(e) => update("matricula", e.target.value)} required />
          </div>
          <div className="space-y-1.5 md:col-span-2">
            <Label>Senha</Label>
            <Input type="password" value={form.senha} onChange={(e) => update("senha", e.target.value)} required minLength={6} />
          </div>
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Enviando..." : "Enviar cadastro"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Já tem conta? <Link to="/login" className="text-primary hover:underline">Entrar</Link>
        </p>
      </form>
    </div>
  );
}
