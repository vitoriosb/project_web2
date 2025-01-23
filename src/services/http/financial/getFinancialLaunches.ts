"use server";
import api from "@/services/api";
import { createFinancialLaunchProps } from "./createFinancialLaunch";

export async function getFinancialLaunches(): Promise<
  createFinancialLaunchProps[]
> {
  const res = await api.get("/api/v1/financialLaunch");
  console.log(res.data);
  return res.data;
}
