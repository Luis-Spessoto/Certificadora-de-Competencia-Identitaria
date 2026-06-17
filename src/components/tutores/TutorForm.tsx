import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tutor, TutorInput } from "@/types/tutor";

const schema = z.object({
  nome: z.string().trim().min(2, "Mínimo 2 caracteres").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z.string().trim().max(30).optional().or(z.literal("")),
  curso: z.string().trim().min(2).max(120),
  matricula: z.string().trim().min(2).max(30),
  role: z.enum(["admin", "tutor"]).optional(),
  status: z.enum(["pendente", "ativo", "inativo"]).optional(),
});

export type TutorFormValues = z.infer<typeof schema>;

interface Props {
  defaultValues?: Partial<Tutor>;
  onSubmit: (data: TutorInput) => Promise<void> | void;
  submitLabel?: string;
  showAdminFields?: boolean;
}

export function TutorForm({ defaultValues, onSubmit, submitLabel = "Salvar", showAdminFields }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TutorFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      nome: defaultValues?.nome ?? "",
      email: defaultValues?.email ?? "",
      telefone: defaultValues?.telefone ?? "",
      curso: defaultValues?.curso ?? "",
      matricula: defaultValues?.matricula ?? "",
      role: defaultValues?.role ?? "tutor",
      status: defaultValues?.status ?? "ativo",
    },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={handleSubmit(async (v) => {
        await onSubmit({
          nome: v.nome,
          email: v.email,
          telefone: v.telefone || undefined,
          curso: v.curso,
          matricula: v.matricula,
          role: v.role,
          status: v.status,
        });
      })}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Field label="Nome" error={errors.nome?.message}>
          <Input {...register("nome")} />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <Input type="email" {...register("email")} />
        </Field>
        <Field label="Telefone" error={errors.telefone?.message}>
          <Input {...register("telefone")} />
        </Field>
        <Field label="Matrícula" error={errors.matricula?.message}>
          <Input {...register("matricula")} />
        </Field>
        <Field label="Curso" error={errors.curso?.message}>
          <Input {...register("curso")} />
        </Field>

        {showAdminFields && (
          <>
            <Field label="Papel">
              <Select value={watch("role")} onValueChange={(v) => setValue("role", v as "admin" | "tutor")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="tutor">Tutor</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Status">
              <Select value={watch("status")} onValueChange={(v) => setValue("status", v as "pendente" | "ativo" | "inativo")}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </>
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
