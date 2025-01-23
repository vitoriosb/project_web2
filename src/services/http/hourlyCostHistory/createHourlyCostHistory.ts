"use server";
import api from "@/services/api";

export interface createHourlyCostHistoryProps {
  date: string;
  userID: string;
  projectId: string;
  hours: number;
  costValue: number;
}

export async function createHourlyCostHistory(
  data: createHourlyCostHistoryProps
): Promise<void> {
  const res = await api.post("/api/v1/hourlyCostHistory", data);
  return res.data;
}
