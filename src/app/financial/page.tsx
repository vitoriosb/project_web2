"use client";

import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Financial() {
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader text="Financeiro" description="Pagina de financeiro" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full ">
          <div className="flex gap-2">
            <Input
              placeholder="Financeiro"
              className="w-48 bg-primary text-primary-foreground"
              id="searchUsers"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                Adicionar finança
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar finança</DialogTitle>
                <DialogDescription>
                  Adicione o financeiro do usuário
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Mes lançamento
                </Label>
                <Input id="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Trabalhador
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  Projeto
                </Label>
                <Input id="project" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hoursWorked" className="text-right">
                  Horas Trabalhadas
                </Label>
                <Input id="hoursWorked" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  Custo Total
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <DialogFooter>
                <Button type="submit">Salvar</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </article>
    </div>
  );
}
