"use server";
import api from "@/services/api";
import { createHourlyCostHistoryProps } from "./createHourlyCostHistory";

export async function getHourlyCostHistories(): Promise<
  createHourlyCostHistoryProps[]
> {
  const res = await api.get("/api/v1/hourlyCostHistory");
  console.log(res);
  return res.data;
}
