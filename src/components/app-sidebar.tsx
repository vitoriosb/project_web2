// src/components/app-sidebar.tsx
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  BookMarkedIcon,
  Calendar,
  Home,
  Hourglass,
  Inbox,
  RadicalIcon,
  Search,
  Settings,
  User2Icon,
} from "lucide-react";
import { ModeToggle } from "./modle-toggle";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Empregados",
    url: "employees",
    icon: Inbox,
  },
  {
    title: "Projetos",
    url: "project",
    icon: Calendar,
  },
  {
    title: "Financeiro",
    url: "financial",
    icon: Search,
  },
  {
    title: "Deliveries",
    url: "deliveries",
    icon: Settings,
  },
  {
    title: "processo de previsão",
    url: "forecastProcess",
    icon: RadicalIcon,
  },
  {
    title: "Custo Hora",
    url: "hourlyCostHistories",
    icon: Hourglass,
  },
  {
    title: "Projetos de usuario",
    url: "userProject",
    icon: BookMarkedIcon,
  },
  {
    title: "Usuarios",
    url: "users",
    icon: User2Icon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <ModeToggle />
          <SidebarGroupLabel>Rotas</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
