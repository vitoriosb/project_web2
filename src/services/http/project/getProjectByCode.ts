"use server";
import api from "@/services/api";

export async function getProjectByCode(projectCode: string): Promise<void> {
  const res = await api.get(`/api/v1/project/${projectCode}`);
  return res.data;
}
