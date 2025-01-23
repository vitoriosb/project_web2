"use server";
import api from "@/services/api";

export async function createUser(data: any): Promise<void> {
  const res = await api.post("/api/v1/user", data);
  return res.data;
}
