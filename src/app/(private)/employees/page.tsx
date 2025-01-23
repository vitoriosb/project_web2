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
  createEmployee,
  createEmployeeProps,
} from "@/services/http/employee/createEmployee";
import { getEmployees } from "@/services/http/employee/getEmployees";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput extends createEmployeeProps {}

export default function Employees() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [employeeList, setEmployeeList] = useState<createEmployeeProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const employees = await getEmployees();
        setEmployeeList(employees);
      } catch (error) {
        setError("Erro ao buscar empregados");
        console.error(error);
      }
    }
    fetchEmployees();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createEmployee(data);
      reset();
      const employees = await getEmployees();
      setEmployeeList(employees);
    } catch (error) {
      setError("Erro ao criar empregado");
      console.error(error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const employees = await getEmployees();
      const filteredEmployees = employees.filter((employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setEmployeeList(filteredEmployees);
    } catch (error) {
      setError("Erro ao buscar empregados");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader text="Empregados" description="Página de empregados" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar empregado"
              title="Empregado"
              className="w-48 bg-primary text-primary-foreground"
              id="searchEmployees"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-primary text-primary-foreground"
            >
              Buscar
            </Button>
          </form>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                Adicionar empregado
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar empregado</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo empregado.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Nome
                  </Label>
                  <Input
                    id="name"
                    {...register("name", { required: "Nome é obrigatório" })}
                    className="col-span-3"
                  />
                  {errors.name && (
                    <p className="text-red-500 col-span-4">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="age" className="text-right">
                    Idade
                  </Label>
                  <Input
                    id="age"
                    type="number"
                    {...register("age", { required: "Idade é obrigatória" })}
                    className="col-span-3"
                  />
                  {errors.age && (
                    <p className="text-red-500 col-span-4">
                      {errors.age.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar empregado</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl mt-6">
          {employeeList &&
            employeeList.map((employee, index) => (
              <div
                key={index}
                className="bg-slate-800 text-white w-full p-4 flex h-14 rounded-xl justify-between"
              >
                <div>
                  <div>{employee.name}</div>
                  <div>{employee.age} anos</div>
                </div>
              </div>
            ))}
        </div>
      </article>
    </div>
  );
}
