import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-full w-full rounded-lg rounded-b-none max-md:relative max-md:flex-col">
      <AppSidebar />
      <div className="flex-1">{children}</div>
    </div>
  );
}
