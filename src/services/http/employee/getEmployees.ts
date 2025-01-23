"use server";
import api from "@/services/api";

interface Employee {
  name: string;
  age: number;
}

export async function getEmployees(): Promise<Employee[]> {
  const res = await api.get("/api/v1/employee");
  return res.data;
}
