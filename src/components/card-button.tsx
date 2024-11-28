import { User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface CardButtonProps {
  text: string;
  href: string;
}

export function CardButton({ text, href }: CardButtonProps) {
  return (
    <Link href={href}>
      <Button
        variant={"outline"}
        className=" flex flex-col items-center content-center justify-center p-10 h-72 w-72"
      >
        <User />
        <h1>{text}</h1>
      </Button>
    </Link>
  );
}
