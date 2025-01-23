"use server";
import api from "@/services/api";

export async function deleteProject(projectCode: string): Promise<void> {
  const res = await api.delete(`/api/v1/project/${projectCode}`);
  return res.data;
}
