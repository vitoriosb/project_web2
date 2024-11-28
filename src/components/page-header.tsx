import { SidebarTrigger } from "./ui/sidebar";

interface PageHeaderProps {
  text: string;
  description: string;
}

export function PageHeader({ text, description }: PageHeaderProps) {
  return (
    <>
      <SidebarTrigger className="z-10 absolute pl-3" />
      <header className="flex flex-col w-full h-32 p-4 pt-11 items-center justify-start bg-sidebar-accent">
        <h1 className="w-full font-semibold text-4xl ">{text}</h1>
        <p className="w-full">{description}</p>
      </header>
    </>
  );
}
