"use server";
import api from "@/services/api";

interface getProjectsPromise {
  projectCode: string;
  idserial: number;
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

export async function getProjects(): Promise<getProjectsPromise> {
  const res = await api.get("/api/v1/project");
  console.log(res.data);
  return res.data;
}
