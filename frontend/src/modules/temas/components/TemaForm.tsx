import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export function TemaForm({ onSubmit }: { onSubmit: (data: any) => Promise<void> }) {
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>Título do Tema</Label>
            <Input {...register("titulo", { required: true })} placeholder="Ex: Introdução ao React" />
          </div>
          <div className="space-y-2">
            <Label>Descrição</Label>
            <Textarea {...register("descricao", { required: true })} placeholder="Descreva brevemente o que será abordado..." />
          </div>
          <div className="space-y-2">
            <Label>Área/Tecnologia</Label>
            <Input {...register("area", { required: true })} placeholder="Ex: Desenvolvimento Web" />
          </div>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Enviando..." : "Sugerir Tema"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
