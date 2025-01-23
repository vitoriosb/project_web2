"use server";
import api from "@/services/api";

export interface createFinancialLaunchProps {
  launchMonth: string;
  userID: string;
  projectId: string;
  hours: number;
  costValue: number;
}

export async function createFinancialLaunch(
  data: createFinancialLaunchProps
): Promise<void> {
  const res = await api.post("/api/v1/financialLaunch", data);
  console.log(res.data);
  return res.data;
}
