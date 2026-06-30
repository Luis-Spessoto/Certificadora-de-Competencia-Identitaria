import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Turma, TurmaInput } from "../types/aluno";

const schema = z.object({
  nome: z.string().trim().min(2, "Mínimo 2 caracteres").max(120),
  oficinaId: z.string().trim().min(1, "Selecione uma oficina"),
  tutorId: z.string().trim().optional().or(z.literal("")),
  horario: z.string().trim().min(2, "Informe o horário").max(80),
  local: z.string().trim().min(2, "Informe o local").max(120),
  vagas: z.coerce.number().int().min(1, "Mínimo 1 vaga").max(200),
});

export type TurmaFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Turma>;
  onSubmit: (data: TurmaInput) => Promise<void> | void;
  submitLabel?: string;
}

export function TurmaForm({ defaultValues, onSubmit, submitLabel = "Salvar" }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TurmaFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      oficinaId: defaultValues?.oficinaId ?? "",
      tutorId: defaultValues?.tutorId ?? "",
      horario: defaultValues?.horario ?? "",
      local: defaultValues?.local ?? "",
      vagas: defaultValues?.vagas ?? 20,
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (v) => {
        await onSubmit({
          nome: v.nome,
          oficinaId: v.oficinaId,
          tutorId: v.tutorId || undefined,
          horario: v.horario,
          local: v.local,
          vagas: v.vagas,
        });
      })}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nome da turma" error={errors.nome?.message}>
          <Input {...register("nome")} placeholder="Ex: Turma A — Lógica com Scratch" />
        </Field>
        <Field label="ID da Oficina" error={errors.oficinaId?.message}>
          <Input {...register("oficinaId")} placeholder="ID da oficina (módulo Danilo)" />
        </Field>
        <Field label="Horário" error={errors.horario?.message}>
          <Input {...register("horario")} placeholder="Ex: Sábado 09:00–11:00" />
        </Field>
        <Field label="Local" error={errors.local?.message}>
          <Input {...register("local")} placeholder="Ex: Lab. Informática UTFPR" />
        </Field>
        <Field label="Vagas" error={errors.vagas?.message}>
          <Input type="number" min={1} {...register("vagas")} />
        </Field>
        <Field label="ID do Tutor" error={errors.tutorId?.message}>
          <Input {...register("tutorId")} placeholder="opcional" />
        </Field>
      </div>

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Salvando..." : submitLabel}
      </Button>
    </form>
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
