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
  createProject,
  ProjectProps,
} from "@/services/http/project/createProject";
import { deleteProject } from "@/services/http/project/deleteProject";
import { getProjects } from "@/services/http/project/getProjects";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function Projects() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProjectProps>();
  const [projectList, setProjectList] = useState<ProjectProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      try {
        const projects = await getProjects();
        setProjectList(projects);
      } catch (error) {
        setError("Erro ao buscar projetos");
        console.error(error);
      }
    }
    fetchProjects();
  }, []);

  const onSubmit: SubmitHandler<ProjectProps> = async (data) => {
    try {
      await createProject(data);
      reset();
      const projects = await getProjects();
      setProjectList(projects);
    } catch (error) {
      setError("Erro ao criar projeto");
      console.error(error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const projects = await getProjects();
      const filteredProjects = projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setProjectList(filteredProjects);
    } catch (error) {
      setError("Erro ao buscar projetos");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader text="Projetos" description="Página de projetos" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar projeto"
              title="Projeto"
              className="w-48 bg-primary text-primary-foreground"
              id="searchProjects"
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
                Adicionar projeto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar projeto</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo projeto.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Título
                  </Label>
                  <Input
                    id="title"
                    {...register("title", { required: "Título é obrigatório" })}
                    className="col-span-3"
                  />
                  {errors.title && (
                    <p className="text-red-500 col-span-4">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="developmentStat" className="text-right">
                    Status de Desenvolvimento
                  </Label>
                  <Input
                    id="developmentStat"
                    {...register("developmentStat", {
                      required: "Status de desenvolvimento é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.developmentStat && (
                    <p className="text-red-500 col-span-4">
                      {errors.developmentStat.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estimatedCost" className="text-right">
                    Custo Estimado
                  </Label>
                  <Input
                    id="estimatedCost"
                    type="number"
                    {...register("estimatedCost", {
                      required: "Custo estimado é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.estimatedCost && (
                    <p className="text-red-500 col-span-4">
                      {errors.estimatedCost.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="approvedCost" className="text-right">
                    Custo Aprovado
                  </Label>
                  <Input
                    id="approvedCost"
                    type="number"
                    {...register("approvedCost", {
                      required: "Custo aprovado é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.approvedCost && (
                    <p className="text-red-500 col-span-4">
                      {errors.approvedCost.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalAccomplished" className="text-right">
                    Total Realizado
                  </Label>
                  <Input
                    id="totalAccomplished"
                    type="number"
                    {...register("totalAccomplished", {
                      required: "Total realizado é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.totalAccomplished && (
                    <p className="text-red-500 col-span-4">
                      {errors.totalAccomplished.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="totalAvailable" className="text-right">
                    Total Disponível
                  </Label>
                  <Input
                    id="totalAvailable"
                    type="number"
                    {...register("totalAvailable", {
                      required: "Total disponível é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.totalAvailable && (
                    <p className="text-red-500 col-span-4">
                      {errors.totalAvailable.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="observations" className="text-right">
                    Observações
                  </Label>
                  <Input
                    id="observations"
                    {...register("observations", {
                      required: "Observações são obrigatórias",
                    })}
                    className="col-span-3"
                  />
                  {errors.observations && (
                    <p className="text-red-500 col-span-4">
                      {errors.observations.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  {" "}
                  <Label htmlFor="requestingArea" className="text-right">
                    Área Solicitante
                  </Label>
                  <Input
                    id="requestingArea"
                    {...register("requestingArea", {
                      required: "Área solicitante é obrigatória",
                    })}
                    className="col-span-3"
                  />
                  {errors.requestingArea && (
                    <p className="text-red-500 col-span-4">
                      {errors.requestingArea.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="expectedStart" className="text-right">
                    Início Esperado
                  </Label>
                  <Input
                    id="expectedStart"
                    type="date"
                    {...register("expectedStart", {
                      required: "Início esperado é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.expectedStart && (
                    <p className="text-red-500 col-span-4">
                      {errors.expectedStart.message}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="durationExpected" className="text-right">
                    Duração Esperada
                  </Label>
                  <Input
                    id="durationExpected"
                    type="number"
                    {...register("durationExpected", {
                      required: "Duração esperada é obrigatória",
                    })}
                    className="col-span-3"
                  />
                  {errors.durationExpected && (
                    <p className="text-red-500 col-span-4">
                      {errors.durationExpected.message}
                    </p>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit">Salvar projeto</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl mt-6">
          {projectList &&
            projectList.map((project) => (
              <div
                key={project.projectCode}
                className="bg-slate-800 text-white w-full p-4 flex flex-col rounded-xl"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{project.title}</h3>
                    <p>Status: {project.developmentStat}</p>
                    <p>Custo Estimado: R$ {project.estimatedCost}</p>
                    <p>Custo Aprovado: R$ {project.approvedCost}</p>
                    <p>Total Realizado: R$ {project.totalAccomplished}</p>
                    <p>Total Disponível: R$ {project.totalAvailable}</p>
                    <p>Observações: {project.observations}</p>
                    <p>Área Solicitante: {project.requestingArea}</p>
                    <p>Início Esperado: {project.expectedStart}</p>
                    <p>Duração Esperada: {project.durationExpected} dias</p>
                  </div>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={async () => {
                      try {
                        await deleteProject(project.projectCode);
                        const projects = await getProjects();
                        setProjectList(projects);
                      } catch (error) {
                        setError("Erro ao deletar projeto");
                        console.error(error);
                      }
                    }}
                  >
                    Deletar
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </article>
    </div>
  );
}
