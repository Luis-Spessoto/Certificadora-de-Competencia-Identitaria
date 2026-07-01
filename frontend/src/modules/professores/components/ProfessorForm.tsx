import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import type { Professor, ProfessorInput } from "../types/professor";

interface ProfessorFormProps {
  defaultValues?: Partial<Professor>;
  onSubmit: (data: ProfessorInput) => Promise<void>;
  submitLabel?: string;
}

export function ProfessorForm({ defaultValues, onSubmit, submitLabel = "Salvar" }: ProfessorFormProps) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm<ProfessorInput>({
    defaultValues: {
      nome: defaultValues?.nome || "",
      email: defaultValues?.email || "",
    }
  });

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome completo</Label>
            <Input id="nome" {...register("nome", { required: true })} placeholder="Ex: João Silva" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" {...register("email", { required: true })} placeholder="joao@utfpr.edu.br" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
