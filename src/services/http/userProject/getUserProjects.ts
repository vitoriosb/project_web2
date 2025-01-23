"use server";
import api from "@/services/api";

export async function getUserProjects(): Promise<void> {
  const res = await api.get("/api/v1/userproject");
  return res.data;
}
