"use server";
import api from "@/services/api";

export async function deleteFinancialLaunch(idSerial: string): Promise<void> {
  const res = await api.delete(`/api/v1/financialLaunch/${idSerial}`);
  return res.data;
}
