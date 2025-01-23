import { CardButton } from "@/components/card-button";
import { PageHeader } from "@/components/page-header";
import {
  BookMarkedIcon,
  Calendar,
  Hourglass,
  Inbox,
  RadicalIcon,
  Search,
  Settings,
  User2Icon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader text="Home" description="Pagina Principal" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center justify-center gap-6">
        <div className="flex gap-6">
          <CardButton text="Empregados" href="/employees" icon={Inbox} />
          <CardButton text="Projetos" href="/project" icon={Calendar} />
          <CardButton text="Financeiro" href="/financial" icon={Search} />
        </div>
        <div className="flex gap-6">
          <CardButton text="Deliveries" href="/deliveries" icon={Settings} />
          <CardButton
            text="processo de previsão"
            href="/forecastProcess"
            icon={RadicalIcon}
          />
          <CardButton
            text="Custo Hora"
            href="/hourlyCostHistories"
            icon={Hourglass}
          />
        </div>
        <div className="flex gap-6">
          <CardButton
            text="Projetos de usuario"
            href="/userProject"
            icon={BookMarkedIcon}
          />
          <CardButton text="Usuarios" href="/users" icon={User2Icon} />
        </div>
      </article>
    </div>
  );
}
