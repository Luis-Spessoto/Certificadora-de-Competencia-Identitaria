import { useQuery } from "@tanstack/react-query";
import { tutoresService } from "@/services/tutoresService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Placeholder: consome o contrato de Oficina exposto pelo módulo do Danilo.
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
            Nenhuma oficina vinculada. (Integração com módulo de oficinas do Danilo.)
          </p>
        )}
        {data && data.length > 0 && (
          <ul className="space-y-2">
            {data.map((o) => (
              <li key={o.id} className="rounded-md border border-border p-3">
                <div className="font-medium text-sm">{o.titulo}</div>
                {o.descricao && <div className="text-xs text-muted-foreground">{o.descricao}</div>}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
