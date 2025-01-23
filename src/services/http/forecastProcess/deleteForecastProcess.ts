"use server";
import api from "@/services/api";

export async function deleteForecastProcess(idSerial: string): Promise<void> {
  const res = await api.delete(`/api/v1/forecastProcess/${idSerial}`);
  return res.data;
}
