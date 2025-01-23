"use server";
import api from "@/services/api";

interface createForecastProcessProps {
  launchMonth: string;
  userID: string;
  projectId: string;
  hours: number;
  cosValue: number;
}

export async function createForecastProcess(
  data: createForecastProcessProps
): Promise<void> {
  const res = await api.post("/api/v1/forecastProcess", data);
  return res.data;
}
