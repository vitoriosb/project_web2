"use server";
import api from "@/services/api";

export interface ProjectProps {
  projectCode: string;
  title: string;
  developmentStat: string;
  estimatedCost: number;
  approvedCost: number;
  totalAccomplished: number;
  totalAvailable: number;
  observations: string;
  requestingArea: string;
  expectedStart: string;
  durationExpected: number;
}

export async function createProject(data: ProjectProps): Promise<void> {
  const res = await api.post("/api/v1/project", data);
  return res.data;
}
