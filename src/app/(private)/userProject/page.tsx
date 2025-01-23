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
  createUserProject,
  createUserProjectProps,
} from "@/services/http/userProject/createUserProject";
import { deleteUserProject } from "@/services/http/userProject/deleteUserProject";
import { getUserProjects } from "@/services/http/userProject/getUserProjects";

import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function UserProjects() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserProjectProps>();
  const [userProjectList, setUserProjectList] = useState<
    createUserProjectProps[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUserProjects() {
      try {
        const userProjects = await getUserProjects();
        setUserProjectList(userProjects);
      } catch (error) {
        setError("Erro ao buscar projetos de usuários");
        console.error(error);
      }
    }
    fetchUserProjects();
  }, []);

  const onSubmit: SubmitHandler<createUserProjectProps> = async (data) => {
    try {
      await createUserProject(data);
      reset();
      const userProjects = await getUserProjects();
      setUserProjectList(userProjects);
    } catch (error) {
      setError("Erro ao criar projeto de usuário");
      console.error(error);
    }
  };

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const userProjects = await getUserProjects();
      const filteredUserProjects = userProjects.filter((userProject) =>
        userProject.userCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserProjectList(filteredUserProjects);
    } catch (error) {
      setError("Erro ao buscar projetos de usuários");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader
        text="Projetos de Usuários"
        description="Página de projetos de usuários"
      />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar projeto de usuário"
              title="Projeto de Usuário"
              className="w-48 bg-primary text-primary-foreground"
              id="searchUserProjects"
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
                Adicionar projeto de usuário
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar projeto de usuário</DialogTitle>
                <DialogDescription>
                  Preencha os campos abaixo para adicionar um novo projeto de
                  usuário.
                </DialogDescription>
              </DialogHeader>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid gap-4 py-4"
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="userCode" className="text-right">
                    Código do Usuário
                  </Label>
                  <Input
                    id="userCode"
                    {...register("userCode", {
                      required: "Código do usuário é obrigatório",
                    })}
                    className="col-span-3"
                  />
                  {errors.userCode && (
                    <p className="text-red-500 col-span-4">
                      {errors.userCode.message}
                    </p>
                  )}
                </div>
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
                <DialogFooter>
                  <Button type="submit">Salvar projeto de usuário</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl mt-6">
          {userProjectList &&
            userProjectList.map((userProject) => (
              <div
                key={`${userProject.userCode}-${userProject.projectCode}`}
                className="bg-slate-800 text-white w-full p-4 flex flex-col rounded-xl"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">
                      Usuário: {userProject.userCode}
                    </h3>
                    <p>Projeto: {userProject.projectCode}</p>
                    {/* Adicione outros campos relevantes aqui */}
                  </div>
                  <Button
                    className="bg-red-500 text-white"
                    onClick={async () => {
                      try {
                        await deleteUserProject(
                          userProject.userCode,
                          userProject.projectCode
                        );
                        const userProjects = await getUserProjects();
                        setUserProjectList(userProjects);
                      } catch (error) {
                        setError("Erro ao deletar projeto de usuário");
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
