"use server";
import Cookies from "js-cookie";
import api from "../api";

interface AuthResponse {
  token: string;
}

export async function auth(
  username: string,
  password: string
): Promise<AuthResponse> {
  const res = await api.post("/api/v1/auth", { username, password });
  Cookies.set("token", res.data.token);
  console.log(res.data);
  return res.data;
}
