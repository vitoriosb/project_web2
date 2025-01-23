"use server";
import api from "@/services/api";

export async function getUserProjectByCodes(
  userCode: string,
  projectCode: string
): Promise<void> {
  const res = await api.get(`/api/v1/userproject/${userCode}/${projectCode}`);
  return res.data;
}
