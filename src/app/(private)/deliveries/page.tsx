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
  createDelivery,
  createDeliveryProps,
} from "@/services/http/deliveries/createDelivery";
import { deleteDelivery } from "@/services/http/deliveries/deleteDelivery";
import { getDeliveries } from "@/services/http/deliveries/getDeliveries";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput extends createDeliveryProps {}

export default function Deliveries() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormInput>();
  const [deliveryList, setDeliveryList] = useState<createDeliveryProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchDeliveries() {
      try {
        const deliveries = await getDeliveries();

        setDeliveryList(deliveries);
      } catch (error) {
        setError("Erro ao buscar entregas");
        console.error(error);
      }
    }
    fetchDeliveries();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      await createDelivery(data);
      reset();
      const deliveries = await getDeliveries();
      setDeliveryList(deliveries);
    } catch (error) {
      setError("Erro ao criar entrega");
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDelivery(id);
      const deliveries = await getDeliveries();
      setDeliveryList(deliveries);
    } catch (error) {
      setError("Erro ao deletar entrega");
      console.error(error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const deliveries = await getDeliveries();
      const filteredDeliveries = deliveries.filter((delivery) =>
        delivery.projectCode.includes(searchTerm)
      );
      setDeliveryList(filteredDeliveries);
    } catch (error) {
      setError("Erro ao buscar entregas");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader text="Deliveries" description="Página de deliveries" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar delivery"
              title="Delivery"
              className="w-48 bg-primary text-primary-foreground"
              id="searchDeliveries"
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
                Adicionar delivery
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full h-full overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Adicionar delivery</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo delivery.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="projectCode" className="text-right">
                    Código do Projeto
                  </Label>
                  <Input
                    id="projectCode"
                    {...register("projectCode", {
                      required: "Código do projeto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.projectCode && (
                    <p className="text-red-500 col-span-4">
                      {errors.projectCode.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="specFuncPrevisionStart"
                    className="text-right"
                  >
                    Início Previsto da Especificação Funcional
                  </Label>
                  <Input
                    id="specFuncPrevisionStart"
                    type="date"
                    {...register("specFuncPrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.specFuncPrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.specFuncPrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specFuncPrevisionEnd" className="text-right">
                    Fim Previsto da Especificação Funcional
                  </Label>
                  <Input
                    id="specFuncPrevisionEnd"
                    type="date"
                    {...register("specFuncPrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.specFuncPrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.specFuncPrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="specFuncExecutionStart"
                    className="text-right"
                  >
                    Início da Execução da Especificação Funcional
                  </Label>
                  <Input
                    id="specFuncExecutionStart"
                    type="date"
                    {...register("specFuncExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.specFuncExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.specFuncExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="specFuncExecutionEnd" className="text-right">
                    Fim da Execução da Especificação Funcional
                  </Label>
                  <Input
                    id="specFuncExecutionEnd"
                    type="date"
                    {...register("specFuncExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.specFuncExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.specFuncExecutionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="approvalPrevisionStart"
                    className="text-right"
                  >
                    Início Previsto da Aprovação
                  </Label>
                  <Input
                    id="approvalPrevisionStart"
                    type="date"
                    {...register("approvalPrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.approvalPrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.approvalPrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="approvalPrevisionEnd" className="text-right">
                    Fim Previsto da Aprovação
                  </Label>
                  <Input
                    id="approvalPrevisionEnd"
                    type="date"
                    {...register("approvalPrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.approvalPrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.approvalPrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="approvalExecutionStart"
                    className="text-right"
                  >
                    Início da Execução da Aprovação
                  </Label>
                  <Input
                    id="approvalExecutionStart"
                    type="date"
                    {...register("approvalExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.approvalExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.approvalExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="approvalExecutionEnd" className="text-right">
                    Fim da Execução da Aprovação
                  </Label>
                  <Input
                    id="approvalExecutionEnd"
                    type="date"
                    {...register("approvalExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.approvalExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.approvalExecutionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="developmentPrevisionStart"
                    className="text-right"
                  >
                    Início Previsto do Desenvolvimento
                  </Label>
                  <Input
                    id="developmentPrevisionStart"
                    type="date"
                    {...register("developmentPrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.developmentPrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.developmentPrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="developmentPrevisionEnd"
                    className="text-right"
                  >
                    Fim Previsto do Desenvolvimento
                  </Label>
                  <Input
                    id="developmentPrevisionEnd"
                    type="date"
                    {...register("developmentPrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.developmentPrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.developmentPrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="developmentExecutionStart"
                    className="text-right"
                  >
                    Início da Execução do Desenvolvimento
                  </Label>
                  <Input
                    id="developmentExecutionStart"
                    type="date"
                    {...register("developmentExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.developmentExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.developmentExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="developmentExecutionEnd"
                    className="text-right"
                  >
                    Fim da Execução do Desenvolvimento
                  </Label>
                  <Input
                    id="developmentExecutionEnd"
                    type="date"
                    {...register("developmentExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.developmentExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.developmentExecutionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="testTIPrevisionStart" className="text-right">
                    Início Previsto do Teste TI
                  </Label>
                  <Input
                    id="testTIPrevisionStart"
                    type="date"
                    {...register("testTIPrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.testTIPrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.testTIPrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="testTIPrevisionEnd" className="text-right">
                    Fim Previsto do Teste TI
                  </Label>
                  <Input
                    id="testTIPrevisionEnd"
                    type="date"
                    {...register("testTIPrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.testTIPrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.testTIPrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="testTIExecutionStart" className="text-right">
                    Início da Execução do Teste TI
                  </Label>
                  <Input
                    id="testTIExecutionStart"
                    type="date"
                    {...register("testTIExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.testTIExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.testTIExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="testTIExecutionEnd" className="text-right">
                    Fim da Execução do Teste TI
                  </Label>
                  <Input
                    id="testTIExecutionEnd"
                    type="date"
                    {...register("testTIExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.testTIExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.testTIExecutionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="homologationPrevisionStart"
                    className="text-right"
                  >
                    Início Previsto da Homologação
                  </Label>
                  <Input
                    id="homologationPrevisionStart"
                    type="date"
                    {...register("homologationPrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.homologationPrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.homologationPrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="homologationPrevisionEnd"
                    className="text-right"
                  >
                    Fim Previsto da Homologação
                  </Label>
                  <Input
                    id="homologationPrevisionEnd"
                    type="date"
                    {...register("homologationPrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.homologationPrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.homologationPrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="homologationExecutionStart"
                    className="text-right"
                  >
                    Início da Execução da Homologação
                  </Label>
                  <Input
                    id="homologationExecutionStart"
                    type="date"
                    {...register("homologationExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.homologationExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.homologationExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="homologationExecutionEnd"
                    className="text-right"
                  >
                    Fim da Execução da Homologação
                  </Label>
                  <Input
                    id="homologationExecutionEnd"
                    type="date"
                    {...register("homologationExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.homologationExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.homologationExecutionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goLivePrevisionStart" className="text-right">
                    Início Previsto do Go Live
                  </Label>
                  <Input
                    id="goLivePrevisionStart"
                    type="date"
                    {...register("goLivePrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.goLivePrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.goLivePrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goLivePrevisionEnd" className="text-right">
                    Fim Previsto do Go Live
                  </Label>
                  <Input
                    id="goLivePrevisionEnd"
                    type="date"
                    {...register("goLivePrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.goLivePrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.goLivePrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goLiveExecutionStart" className="text-right">
                    Início da Execução do Go Live
                  </Label>
                  <Input
                    id="goLiveExecutionStart"
                    type="date"
                    {...register("goLiveExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.goLiveExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.goLiveExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="goLiveExecutionEnd" className="text-right">
                    Fim da Execução do Go Live
                  </Label>
                  <Input
                    id="goLiveExecutionEnd"
                    type="date"
                    {...register("goLiveExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.goLiveExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.goLiveExecutionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="assistedOperationPrevisionStart"
                    className="text-right"
                  >
                    Início Previsto da Operação Assistida
                  </Label>
                  <Input
                    id="assistedOperationPrevisionStart"
                    type="date"
                    {...register("assistedOperationPrevisionStart", {
                      required: "Início previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.assistedOperationPrevisionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.assistedOperationPrevisionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="assistedOperationPrevisionEnd"
                    className="text-right"
                  >
                    Fim Previsto da Operação Assistida
                  </Label>
                  <Input
                    id="assistedOperationPrevisionEnd"
                    type="date"
                    {...register("assistedOperationPrevisionEnd", {
                      required: "Fim previsto é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.assistedOperationPrevisionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.assistedOperationPrevisionEnd.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="assistedOperationExecutionStart"
                    className="text-right"
                  >
                    Início da Execução da Operação Assistida
                  </Label>
                  <Input
                    id="assistedOperationExecutionStart"
                    type="date"
                    {...register("assistedOperationExecutionStart", {
                      required: "Início da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.assistedOperationExecutionStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.assistedOperationExecutionStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label
                    htmlFor="assistedOperationExecutionEnd"
                    className="text-right"
                  >
                    Fim da Execução da Operação Assistida
                  </Label>
                  <Input
                    id="assistedOperationExecutionEnd"
                    type="date"
                    {...register("assistedOperationExecutionEnd", {
                      required: "Fim da execução é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.assistedOperationExecutionEnd && (
                    <p className="text-red-500 col-span-4">
                      {errors.assistedOperationExecutionEnd.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar delivery</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl">
          {deliveryList == undefined && <p>Nenhum valor encontrado</p>}
          {deliveryList &&
            deliveryList.map((item) => (
              <div
                key={item.projectCode}
                className="bg-slate-800 text-white w-full p-4 flex h-14 rounded-xl justify-between"
              >
                <div>
                  <div>{item.projectCode}</div>
                  <div>{item.specFuncPrevisionStart}</div>
                </div>
                <Button
                  onClick={() => handleDelete(item.projectCode)}
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
