"use server";
import api from "@/services/api";

export async function createHourlyCostHistory(data: any): Promise<void> {
  const res = await api.post("/api/v1/hourlyCostHistory", data);
  return res.data;
}
