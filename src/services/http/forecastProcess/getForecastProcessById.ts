"use server";
import api from "@/services/api";

export async function getForecastProcessById(idSerial: string): Promise<void> {
  const res = await api.get(`/api/v1/forecastProcess/${idSerial}`);
  return res.data;
}
