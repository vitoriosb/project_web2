import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";

export default function Deliveries() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader text="Deliveries" description="Pagina de deliveries" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full ">
          <div className="flex gap-2">
            <Input
              placeholder="Deliveries"
              className="w-48 bg-primary text-primary-foreground"
              id="searchUsers"
            />
          </div>
        </div>
      </article>
    </div>
  );
}
