"use server";
import api from "@/services/api";
import { createUserProjectProps } from "./createUserProject";

export async function getUserProjects(): Promise<createUserProjectProps[]> {
  const res = await api.get("/api/v1/userproject");
  return res.data;
}
