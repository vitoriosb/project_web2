"use server";
import api from "@/services/api";

export interface createUserProjectProps {
  userCode: string;
  projectCode: string;
}

export async function createUserProject(
  data: createUserProjectProps
): Promise<void> {
  const res = await api.post("/api/v1/userproject", data);
  return res.data;
}
