import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { temasService } from "../services/temasService";
import { tutoresService } from "@/modules/tutores/services/tutoresService";
import { professoresService } from "@/modules/professores/services/professoresService";

export function OficinaForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  const { data: temas = [] } = useQuery({ queryKey: ["temas"], queryFn: () => temasService.list() });
  const { data: tutores = [] } = useQuery({ queryKey: ["tutores"], queryFn: () => tutoresService.list() });
  const { data: professores = [] } = useQuery({ queryKey: ["professores"], queryFn: () => professoresService.list() });

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Tema da Oficina</Label>
              <select {...register("temaId", { required: true })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Selecione um tema</option>
                {temas.map(t => <option key={t.id} value={t.id}>{t.titulo}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Tutor Responsável</Label>
              <select {...register("tutorId", { required: true })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                <option value="">Selecione um tutor</option>
                {tutores.map(t => <option key={t.id} value={t.id}>{t.nome}</option>)}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Professor Responsável</Label>
            <select {...register("professorId", { required: true })} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Selecione um professor</option>
              {professores.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
            </select>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Data</Label>
              <Input type="date" {...register("data", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label>Horário</Label>
              <Input type="time" {...register("horario", { required: true })} />
            </div>
            <div className="space-y-2">
              <Label>Local</Label>
              <Input {...register("local", { required: true })} placeholder="Ex: Lab 4" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Nome Personalizado (Opcional)</Label>
            <Input {...register("nome")} placeholder="Ex: Oficina de Python para Iniciantes" />
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Agendando..." : "Agendar Oficina"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
