import api from "../api";

export async function exampleRequest(): Promise<void> {
  const res = await api.get("");
  return res.data;
}
