"use server";
import api from "@/services/api";

export interface createEmployeeProps {
  name: string;
  age: number;
}

export async function createEmployee(data: createEmployeeProps): Promise<void> {
  const res = await api.post("/api/v1/employee", data);
  return res.data;
}
