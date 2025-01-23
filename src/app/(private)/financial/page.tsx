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
  createFinancialLaunch,
  createFinancialLaunchProps,
} from "@/services/http/financial/createFinancialLaunch";
import { deleteFinancialLaunch } from "@/services/http/financial/deleteFinancialLaunch";
import { getFinancialLaunches } from "@/services/http/financial/getFinancialLaunches";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Financial() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createFinancialLaunchProps>();
  const [financialList, setFinancialList] = useState<
    createFinancialLaunchProps[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchFinancialLaunches() {
      try {
        const launches = await getFinancialLaunches();
        setFinancialList(launches);
      } catch (error) {
        setError("Erro ao buscar lançamentos financeiros");
        console.error(error);
      }
    }
    fetchFinancialLaunches();
  }, []);

  const onSubmit: SubmitHandler<createFinancialLaunchProps> = async (data) => {
    try {
      await createFinancialLaunch(data);
      reset();
      const launches = await getFinancialLaunches();
      setFinancialList(launches);
    } catch (error) {
      setError("Erro ao criar lançamento financeiro");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFinancialLaunch(id);
      const launches = await getFinancialLaunches();
      setFinancialList(launches);
    } catch (error) {
      setError("Erro ao deletar lançamento financeiro");
      console.error(error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const launches = await getFinancialLaunches();
      const filteredLaunches = launches.filter((launch) =>
        launch.userID.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFinancialList(filteredLaunches);
    } catch (error) {
      setError("Erro ao buscar lançamentos financeiros");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader text="Financeiro" description="Página de financeiro" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar lançamento"
              title="Lançamento"
              className="w-48 bg-primary text-primary-foreground"
              id="searchFinancial"
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
                Adicionar finança
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar finança</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo lançamento
                  financeiro.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="launchMonth" className="text-right">
                    Mês de Lançamento
                  </Label>
                  <Input
                    id="launchMonth"
                    type="date"
                    {...register("launchMonth", {
                      required: "Mês de lançamento é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.launchMonth && (
                    <p className="text-red-500 col-span-4">
                      {errors.launchMonth.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="userID" className="text-right">
                    ID do Usuário
                  </Label>
                  <Input
                    id="userID"
                    {...register("userID", {
                      required: "ID do usuário é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.userID && (
                    <p className="text-red-500 col-span-4">
                      {errors.userID.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectId" className="text-right">
                    ID do Projeto
                  </Label>
                  <Input
                    id="projectId"
                    {...register("projectId", {
                      required: "ID do projeto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.projectId && (
                    <p className="text-red-500 col-span-4">
                      {errors.projectId.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="hours" className="text-right">
                    Horas Trabalhadas
                  </Label>
                  <Input
                    id="hours"
                    type="number"
                    {...register("hours", {
                      required: "Horas trabalhadas são obrigatórias",
                    })}
                    className="col-span-3"
                  />
                  {errors.hours && (
                    <p className="text-red-500 col-span-4">
                      {errors.hours.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="costValue" className="text-right">
                    Valor do Custo
                  </Label>
                  <Input
                    id="costValue"
                    type="number"
                    {...register("costValue", {
                      required: "Valor do custo é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.costValue && (
                    <p className="text-red-500 col-span-4">
                      {errors.costValue.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar finança</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl mt-6">
          {financialList &&
            financialList.map((launch, index) => (
              <div
                key={index}
                className="bg-slate-800 text-white w-full p-4 flex h-14 rounded-xl justify-between"
              >
                <div>
                  <div>{launch.userID}</div>
                  <div>{launch.projectId}</div>
                  <div>{launch.hours} horas</div>
                  <div>R$ {launch.costValue}</div>
                </div>
              </div>
            ))}
        </div>
      </article>
    </div>
  );
}
