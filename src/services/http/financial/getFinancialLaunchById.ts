"use server";
import api from "@/services/api";

export async function getFinancialLaunchById(idSerial: string): Promise<void> {
  const res = await api.get(`/api/v1/financialLaunch/${idSerial}`);
  return res.data;
}
