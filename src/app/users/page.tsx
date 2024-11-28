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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function Users() {
  const [userType, setUserType] = useState<string>("");
  const [userCreateType, setUserCreateType] = useState<string>("");

  const userList = [
    { name: "Lucas", position: "Dono" },
    { name: "Lucas", position: "Dono" },
    { name: "Lucas", position: "Dono" },
    { name: "Lucas", position: "Dono" },
    { name: "Lucas", position: "Dono" },
  ];

  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader text="Usuarios" description="Pagina usuários" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full ">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar usuário"
              title="Usuario"
              className="w-48 bg-primary text-primary-foreground"
              id="searchUsers"
            />
            <Select
              onValueChange={(value) => {
                setUserCreateType(value);
              }}
              value={userCreateType !== "" ? userCreateType : ""}
            >
              <SelectTrigger className="w-fit bg-primary text-primary-foreground">
                <SelectValue placeholder="cargo" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cargo</SelectLabel>
                  <SelectItem value="owner">Dono</SelectItem>
                  <SelectItem value="manager">Gerente</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="developer">Desenvolvedor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                Adicionar usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar usuário</DialogTitle>
                <DialogDescription>
                  Selecione o usuario que deseja adicionar
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <Select
                  onValueChange={(value) => {
                    setUserType(value);
                  }}
                  value={userType !== "" ? userType : ""}
                >
                  <SelectTrigger className="w-60">
                    <SelectValue placeholder="Selecione o cargo do usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Cargo</SelectLabel>
                      <SelectItem value="owner">Dono</SelectItem>
                      <SelectItem value="manager">Gerente</SelectItem>
                      <SelectItem value="supervisor">Supervisor</SelectItem>
                      <SelectItem value="developer">Desenvolvedor</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {userType === "owner" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome completo
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nickname" className="text-right">
                        Apelido
                      </Label>
                      <Input id="nickname" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hourlyWage" className="text-right">
                        Taxa/Hora
                      </Label>
                      <Input id="hourlyWage" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Senha
                      </Label>
                      <Input id="password" className="col-span-3" />
                    </div>
                  </>
                )}
                {userType === "manager" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome completo
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nickname" className="text-right">
                        Apelido
                      </Label>
                      <Input id="nickname" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hourlyWage" className="text-right">
                        Taxa/Hora
                      </Label>
                      <Input id="hourlyWage" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Senha
                      </Label>
                      <Input id="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attribute" className="text-right">
                        Atributo
                      </Label>
                      <Input id="attribute" className="col-span-3" />
                    </div>
                  </>
                )}
                {userType === "supervisor" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome completo
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nickname" className="text-right">
                        Apelido
                      </Label>
                      <Input id="nickname" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hourlyWage" className="text-right">
                        Taxa/Hora
                      </Label>
                      <Input id="hourlyWage" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Senha
                      </Label>
                      <Input id="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attribute" className="text-right">
                        Atributo
                      </Label>
                      <Input id="attribute" className="col-span-3" />
                    </div>
                  </>
                )}
                {userType === "developer" && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Nome completo
                      </Label>
                      <Input id="name" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="nickname" className="text-right">
                        Apelido
                      </Label>
                      <Input id="nickname" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="hourlyWage" className="text-right">
                        Taxa/Hora
                      </Label>
                      <Input id="hourlyWage" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="password" className="text-right">
                        Senha
                      </Label>
                      <Input id="password" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="attribute" className="text-right">
                        Atributo
                      </Label>
                      <Input id="attribute" className="col-span-3" />
                    </div>
                  </>
                )}
              </div>
              <DialogFooter>
                <Button type="submit">Salvar usuário</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between w-full flex-col gap-2  rounded-xl">
          {userList.map((item) => (
            <div className="bg-slate-800 text-white w-full p-4 flex h-14 rounded-xl justify-between">
              <div>{item.name}</div>
              <div>{item.position}</div>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
