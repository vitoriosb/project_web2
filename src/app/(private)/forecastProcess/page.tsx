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
import { createForecastProcess } from "@/services/http/forecastProcess/createForecastProcess";
import { deleteForecastProcess } from "@/services/http/forecastProcess/deleteForecastProcess";
import { getForecastProcesses } from "@/services/http/forecastProcess/getForecastProcesses";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  launchMonth: string;
  userID: string;
  projectId: string;
  hours: number;
  cosValue: number;
}

export default function ForecastProcess() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [forecastList, setForecastList] = useState<
    {
      id: string;
      launchMonth: string;
      userID: string;
      projectId: string;
      hours: number;
      cosValue: number;
    }[]
  >([]);

  useEffect(() => {
    async function fetchForecasts() {
      const forecasts = await getForecastProcesses();
      setForecastList(forecasts);
    }
    fetchForecasts();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await createForecastProcess(data);
    reset();
    const forecasts = await getForecastProcesses();
    setForecastList(forecasts);
  };

  const handleDelete = async (id: string) => {
    await deleteForecastProcess(id);
    const forecasts = await getForecastProcesses();
    setForecastList(forecasts);
  };

  return (
    <div className="flex flex-col w-full h-full gap-1">
      <PageHeader
        text="Forecast Process"
        description="Página de forecast process"
      />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <div className="flex gap-2">
            <Input
              placeholder="Buscar forecast"
              title="Forecast"
              className="w-48 bg-primary text-primary-foreground"
              id="searchForecasts"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary text-primary-foreground">
                Adicionar forecast
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar forecast</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo forecast.
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
                  <Label htmlFor="cosValue" className="text-right">
                    Valor do Custo
                  </Label>
                  <Input
                    id="cosValue"
                    type="number"
                    {...register("cosValue", {
                      required: "Valor do custo é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.cosValue && (
                    <p className="text-red-500 col-span-4">
                      {errors.cosValue.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar forecast</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl">
          {forecastList.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 text-white w-full p-4 flex h-14 rounded-xl justify-between"
            >
              <div>
                <div>{item.launchMonth}</div>
                <div>{item.userID}</div>
                <div>{item.projectId}</div>
                <div>{item.hours}</div>
                <div>{item.cosValue}</div>
              </div>
              <Button
                onClick={() => handleDelete(item.id)}
                className="bg-red-500 text-white"
              >
                Deletar
              </Button>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
}
