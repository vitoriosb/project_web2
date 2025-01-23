"use server";
import api from "@/services/api";

export async function getFinancialLaunches(): Promise<void> {
  const res = await api.get("/api/v1/financialLaunch");
  console.log(res.data);
  return res.data;
}
