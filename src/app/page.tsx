import { CardButton } from "@/components/card-button";
import { PageHeader } from "@/components/page-header";

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader text="Home" description="Pagina Principal" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center justify-center gap-6">
        <div className="flex gap-6">
          <CardButton text="Usuarios" href="/users" />
          <CardButton text="Projeto" href="/project" />
        </div>
        <div className="flex gap-6">
          <CardButton text="Financeiro" href="financial" />
          <CardButton text="Deliveries" href="deliveries" />
        </div>
      </article>
    </div>
  );
}
