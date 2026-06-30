import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Entrar — ELLP" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, senha);
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5 rounded-lg border border-border bg-card p-6">
        <div>
          <h1 className="text-xl font-semibold">Entrar no ELLP</h1>
          <p className="text-sm text-muted-foreground">Acesso para tutores e administradores.</p>
        </div>
        <div className="space-y-1.5">
          <Label>E-mail</Label>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="space-y-1.5">
          <Label>Senha</Label>
          <Input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Não tem conta? <Link to="/cadastro" className="text-primary hover:underline">Cadastre-se</Link>
        </p>
        <p className="rounded-md bg-muted p-3 text-xs text-muted-foreground">
          <strong>Demo:</strong> admin@ellp.utfpr.edu.br / admin123<br />
          tutor@ellp.utfpr.edu.br / tutor123
        </p>
      </form>
    </div>
  );
}
