import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { professoresService } from "@/modules/professores/services/professoresService";
import { ProfessoresTable } from "@/modules/professores/components/ProfessoresTable";
import { Button } from "@/components/ui/button";
import { Plus, Calendar, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/_authenticated/professores/")({
  component: ProfessoresPage,
});

function ProfessoresPage() {
  const { data: professores = [], isLoading } = useQuery({
    queryKey: ["professores"],
    queryFn: () => professoresService.list(),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Professores</h1>
          <p className="text-sm text-muted-foreground">Gerencie os professores do projeto ELLP.</p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link to="/professores/sugerir-tema">
              <Lightbulb className="mr-2 h-4 w-4" /> Sugerir Tema
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/professores/agendar-oficina">
              <Calendar className="mr-2 h-4 w-4" /> Agendar Oficina
            </Link>
          </Button>
          <Button asChild>
            <Link to="/professores/novo">
              <Plus className="mr-2 h-4 w-4" /> Novo Professor
            </Link>
          </Button>
        </div>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Carregando...</p>
      ) : (
        <ProfessoresTable professores={professores} />
      )}
    </div>
  );
}
