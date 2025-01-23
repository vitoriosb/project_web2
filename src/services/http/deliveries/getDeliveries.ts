"use server";
import api from "../../api";
import { createDeliveryProps } from "./createDelivery";

export async function getDeliveries(): Promise<createDeliveryProps[]> {
  const res = await api.get("/api/v1/deliveries");
  return res.data.arrayDeliveries;
}
