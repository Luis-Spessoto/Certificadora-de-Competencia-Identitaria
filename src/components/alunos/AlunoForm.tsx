import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Aluno, AlunoInput } from "@/types/aluno";

const schema = z.object({
  nome: z.string().trim().min(2, "Mínimo 2 caracteres").max(120),
  email: z.string().trim().email("E-mail inválido").max(255).optional().or(z.literal("")),
  escola: z.string().trim().min(2, "Informe a escola").max(120),
  serie: z.string().trim().min(1, "Informe a série").max(30),
  responsavel: z.string().trim().max(120).optional().or(z.literal("")),
  telefoneResponsavel: z.string().trim().max(30).optional().or(z.literal("")),
  status: z.enum(["ativo", "inativo"]).optional(),
});

export type AlunoFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Aluno>;
  onSubmit: (data: AlunoInput) => Promise<void> | void;
  submitLabel?: string;
  showStatusField?: boolean;
}

export function AlunoForm({ defaultValues, onSubmit, submitLabel = "Salvar", showStatusField }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AlunoFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      email: defaultValues?.email ?? "",
      escola: defaultValues?.escola ?? "",
      serie: defaultValues?.serie ?? "",
      responsavel: defaultValues?.responsavel ?? "",
      telefoneResponsavel: defaultValues?.telefoneResponsavel ?? "",
      status: defaultValues?.status ?? "ativo",
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (v) => {
        await onSubmit({
          nome: v.nome,
          email: v.email || undefined,
          escola: v.escola,
          serie: v.serie,
          responsavel: v.responsavel || undefined,
          telefoneResponsavel: v.telefoneResponsavel || undefined,
          status: v.status,
        });
      })}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nome do aluno" error={errors.nome?.message}>
          <Input {...register("nome")} placeholder="Ex: Maria Souza" />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <Input type="email" {...register("email")} placeholder="opcional" />
        </Field>
        <Field label="Escola / ONG" error={errors.escola?.message}>
          <Input {...register("escola")} placeholder="Ex: E.E. Prof. Alcides" />
        </Field>
        <Field label="Série / Ano" error={errors.serie?.message}>
          <Input {...register("serie")} placeholder="Ex: 8º ano" />
        </Field>
        <Field label="Nome do responsável" error={errors.responsavel?.message}>
          <Input {...register("responsavel")} placeholder="opcional" />
        </Field>
        <Field label="Telefone do responsável" error={errors.telefoneResponsavel?.message}>
          <Input {...register("telefoneResponsavel")} placeholder="(43) 99999-0000" />
        </Field>

        {showStatusField && (
          <Field label="Status">
            <Select
              value={watch("status")}
              onValueChange={(v) => setValue("status", v as "ativo" | "inativo")}
            >
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ativo">Ativo</SelectItem>
                <SelectItem value="inativo">Inativo</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        )}
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
