"use server";
import api from "@/services/api";

export async function getUsers(): Promise<void> {
  const res = await api.get("/api/v1/user");
  return res.data;
}
