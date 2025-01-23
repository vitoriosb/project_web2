"use server";
import api from "@/services/api";

export async function getDeliveryById(deliveryId: string): Promise<void> {
  const res = await api.get(`/api/v1/deliveries/${deliveryId}`);
  return res.data;
}
