"use server";
import api from "@/services/api";

export async function deleteUserProject(
  userCode: string,
  projectCode: string
): Promise<void> {
  const res = await api.delete(
    `/api/v1/userproject/${userCode}/${projectCode}`
  );
  return res.data;
}
