"use server";
import api from "@/services/api";

interface ForecastProcess {
  id: string;
  launchMonth: string;
  userID: string;
  projectId: string;
  hours: number;
  cosValue: number;
}

export async function getForecastProcesses(): Promise<ForecastProcess[]> {
  const res = await api.get("/api/v1/forecastProcess");
  return res.data.map((item: any) => ({
    id: item.id,
    launchMonth: item.launchMonth,
    userID: item.userID,
    projectId: item.projectId,
    hours: item.hours,
    cosValue: item.cosValue,
  }));
}
