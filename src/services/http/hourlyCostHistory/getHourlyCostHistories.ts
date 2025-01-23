"use server";
import api from "@/services/api";

export async function getHourlyCostHistories(): Promise<void> {
  const res = await api.get("/api/v1/hourlyCostHistory");
  console.log(res);
  return res.data;
}
