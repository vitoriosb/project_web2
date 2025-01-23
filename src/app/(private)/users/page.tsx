"use client";

import { PageHeader } from "@/components/page-header";
import { Input } from "@/components/ui/input";
import { getUsers } from "@/services/http/users/getUsers";

import { useEffect, useState } from "react";

interface User {
  userCode: string;
  name: string;
  email: string;
  // Adicione outros campos relevantes aqui
}

export default function Users() {
  const [userList, setUserList] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();
        setUserList(users);
      } catch (error) {
        setError("Erro ao buscar usuários");
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const users = await getUsers();
      const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setUserList(filteredUsers);
    } catch (error) {
      setError("Erro ao buscar usuários");
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex-col w-full h-full gap-1 items-center">
      <PageHeader text="Usuários" description="Página de usuários" />
      <article className="flex flex-col w-full h-full bg-sidebar-accent items-center p-4 gap-6">
        <div className="flex justify-between w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Buscar usuário"
              title="Usuário"
              className="w-48 bg-primary text-primary-foreground"
              id="searchUsers"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground px-4 py-2 rounded"
            >
              Buscar
            </button>
          </form>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-between w-full flex-col gap-2 rounded-xl mt-6">
          {userList &&
            userList.map((user) => (
              <div
                key={user.userCode}
                className="bg-slate-800 text-white w-full p-4 flex flex-col rounded-xl"
              >
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    <p>Email: {user.email}</p>
                    {/* Adicione outros campos relevantes aqui */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </article>
    </div>
  );
}
