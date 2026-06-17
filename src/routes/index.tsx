import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { GraduationCap, Users, BookOpen, BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELLP — Ensino Lúdico de Lógica e Programação" },
      { name: "description", content: "Plataforma de gestão de oficinas do projeto de extensão ELLP da UTFPR." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="font-semibold">ELLP — UTFPR</span>
          </div>
          <div className="flex gap-2">
            <Button asChild variant="ghost"><Link to="/login">Entrar</Link></Button>
            <Button asChild><Link to="/cadastro">Cadastrar como tutor</Link></Button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-20 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Gestão das oficinas do <span className="text-primary">ELLP</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Centralize tutores, temas e turmas do projeto de extensão Ensino Lúdico de
          Lógica e Programação da UTFPR.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild size="lg"><Link to="/login">Acessar painel</Link></Button>
          <Button asChild size="lg" variant="outline"><Link to="/cadastro">Quero ser tutor</Link></Button>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-20 md:grid-cols-3">
        <Feature icon={Users} title="Tutores" desc="Cadastro, aprovação e gestão dos acadêmicos que ministram oficinas." />
        <Feature icon={BookOpen} title="Temas e oficinas" desc="Curadoria digital dos conteúdos lúdicos oferecidos." />
        <Feature icon={BarChart3} title="Impacto social" desc="Métricas claras sobre o alcance do projeto na comunidade." />
      </section>
    </div>
  );
}

function Feature({ icon: Icon, title, desc }: { icon: React.ComponentType<{ className?: string }>; title: string; desc: string }) {
  return (
    <div className="rounded-lg border border-border p-6">
      <Icon className="h-8 w-8 text-primary" />
      <h3 className="mt-3 font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{desc}</p>
    </div>
  );
}
