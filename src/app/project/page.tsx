"use client";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useState } from "react";

export default function Project() {
  const [hasDate, setHasDate] = useState<boolean>(false);
  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader text="Projeto" description="Pagina de projetos" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full ">
          <div className="flex gap-2">
            <Input
              placeholder="Projeto"
              className="w-48 bg-primary text-primary-foreground"
              id="searchProject"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                Adicionar projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar projeto</DialogTitle>
                <DialogDescription>Adicione o projeto</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  título
                </Label>
                <Input id="date" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  título
                </Label>
                <Input id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="project" className="text-right">
                  desenvolvedor
                </Label>
                <Input id="project" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="hoursWorked" className="text-right">
                  supervisor
                </Label>
                <Input id="hoursWorked" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  custo total da demanda
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  custo geral realizado
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  saldo disponível
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  campo de observações
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  solicitante
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="totalCost" className="text-right">
                  início esperado e duração esperada
                </Label>
                <Input id="totalCost" className="col-span-3" />
              </div>
              <div className="flex gap-2">
                <Checkbox
                  id="terms"
                  onClick={() => {
                    hasDate === false ? setHasDate(true) : setHasDate(false);
                  }}
                />
                <Label htmlFor="email">Adicionar data?</Label>
                {hasDate === true && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="totalCost" className="text-right">
                        início
                      </Label>
                      <Input id="totalCost" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="totalCost" className="text-right">
                        fim
                      </Label>
                      <Input id="totalCost" className="col-span-3" />
                    </div>
                  </>
                )}
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
