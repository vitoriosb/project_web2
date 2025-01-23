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
  createHourlyCostHistory,
  createHourlyCostHistoryProps,
} from "@/services/http/hourlyCostHistory/createHourlyCostHistory";
import { getHourlyCostHistories } from "@/services/http/hourlyCostHistory/getHourlyCostHistories";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function HourlyCostHistories() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createHourlyCostHistoryProps>();
  const [costHistoryList, setCostHistoryList] = useState<
    createHourlyCostHistoryProps[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCostHistories() {
      try {
        const histories = await getHourlyCostHistories();
        setCostHistoryList(histories);
      } catch (error) {
        setError("Erro ao buscar histórico de custos por hora");
        console.error(error);
      }
    }
    fetchCostHistories();
  }, []);

  const onSubmit: SubmitHandler<createHourlyCostHistoryProps> = async (
    data
  ) => {
    try {
      await createHourlyCostHistory(data);
      reset();
      const histories = await getHourlyCostHistories();
      setCostHistoryList(histories);
    } catch (error) {
      setError("Erro ao criar histórico de custo por hora");
      console.error(error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const histories = await getHourlyCostHistories();
      const filteredHistories = histories.filter((history) =>
        history.userID.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setCostHistoryList(filteredHistories);
    } catch (error) {
      setError("Erro ao buscar histórico de custos por hora");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader
        text="Histórico de Custos por Hora"
        description="Página de histórico de custos por hora"
      />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar histórico"
              title="Histórico"
              className="w-48 bg-primary text-primary-foreground"
              id="searchCostHistory"
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
                Adicionar histórico
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar histórico</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo histórico de
                  custo por hora.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Data
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    {...register("date", { required: "Data é obrigatória" })}
                    className="col-span-3"
                  />
                  {errors.date && (
                    <p className="text-red-500 col-span-4">
                      {errors.date.message}
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
                  <Button type="submit">Salvar histórico</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {costHistoryList == undefined && (
          <p className="text-red-500">Não encontrado</p>
        )}
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl mt-6">
          {costHistoryList &&
            costHistoryList.map((history, index) => (
              <div
                key={index}
                className="bg-slate-800 text-white w-full p-4 flex h-14 rounded-xl justify-between"
              >
                <div>
                  <div>{history.userID}</div>
                  <div>{history.projectId}</div>
                  <div>{history.hours} horas</div>
                  <div>R$ {history.costValue}</div>
                </div>
              </div>
            ))}
        </div>
      </article>
    </div>
  );
}
