"use server";
import api from "@/services/api";

export async function deleteDelivery(deliveryId: string): Promise<void> {
  const res = await api.delete(`/api/v1/deliveries/${deliveryId}`);
  return res.data;
}
