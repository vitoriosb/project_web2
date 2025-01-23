import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface CardButtonProps {
  text: string;
  href: string;
  icon: LucideIcon;
}

export function CardButton({ text, href, icon: Icon }: CardButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant={"outline"}
        className="flex flex-col items-center content-center justify-center p-10 h-72 w-72"
      >
        <Icon className="mb-2" /> {/* Renderizando o ícone */}
        <h1>{text}</h1>
      </Button>
    </Link>
  );
}
