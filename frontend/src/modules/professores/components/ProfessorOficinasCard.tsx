import { useQuery } from "@tanstack/react-query";
import { professoresService } from "../services/professoresService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function ProfessorOficinasCard({ professorId }: { professorId: string }) {
  const { data: oficinas = [], isLoading } = useQuery({
    queryKey: ["professor", professorId, "oficinas"],
    queryFn: () => professoresService.oficinas(professorId),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Oficinas agendadas por este professor</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
        {!isLoading && oficinas.length === 0 && (
          <p className="text-sm text-muted-foreground">Nenhuma oficina agendada.</p>
        )}
        {!isLoading && oficinas.length > 0 && (
          <div className="space-y-3">
            {oficinas.map((o) => (
              <div key={o.id} className="border rounded-lg p-3 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{o.nome}</p>
                    {o.tutorId && (
                      <p className="text-xs font-medium text-primary">
                        Tutor: {o.tutorId.nome || "Vinculado"}
                      </p>
                    )}
                    {o.data && o.horario && (
                      <p className="text-xs text-muted-foreground">
                        {o.data} às {o.horario}
                      </p>
                    )}
                  </div>
                  <Badge variant="secondary">Agendada</Badge>
                </div>
                {o.local && (
                  <p className="text-xs text-muted-foreground italic">📍 {o.local}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
