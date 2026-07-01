import { useQuery } from "@tanstack/react-query";
import { tutoresService } from "../services/tutoresService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TutorOficinasCard({ tutorId }: { tutorId: string }) {
  const { data, isLoading } = useQuery({
    queryKey: ["tutor", tutorId, "oficinas"],
    queryFn: () => tutoresService.oficinas(tutorId),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Oficinas vinculadas</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading && <p className="text-sm text-muted-foreground">Carregando...</p>}
        {!isLoading && (!data || data.length === 0) && (
          <p className="text-sm text-muted-foreground">
            Nenhuma oficina vinculada.
          </p>
        )}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((o) => (
              <li key={o.id} className="rounded-md border border-border p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="font-medium text-sm">{o.nome || o.titulo}</div>
                  <div className="text-[10px] font-medium bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded uppercase">
                    {o.data || "Sem data"}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {o.horario && <span>🕒 {o.horario}</span>}
                  {o.local && <span className="ml-3">📍 {o.local}</span>}
                </div>
                {o.professorId && (
                  <div className="text-xs font-medium text-primary pt-1 border-t border-border/50 mt-1">
                    Professor: {o.professorId.nome || "Vinculado"}
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
