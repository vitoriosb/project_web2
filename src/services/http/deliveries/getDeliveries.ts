"use server";
import api from "../../api";

export async function getDeliveries(): Promise<unknown> {
  const res = await api.get("/api/v1/deliveries");
  return res.data.arrayDeliveries;
}
