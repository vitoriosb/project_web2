"use server";
import { User } from "@/app/(private)/users/page";
import api from "@/services/api";

export async function getUsers(): Promise<User[]> {
  const res = await api.get("/api/v1/user");
  return res.data;
}
