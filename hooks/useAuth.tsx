import { useEffect, useState } from "react";
import { UserType } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instanceBackend } from "../config/constants";

export default function useAuth() {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    loginWithToken();
  }, []);

  async function loginWithToken() {
    try {
      const user = await AsyncStorage.getItem("SSUser");
      const token = JSON.parse(user || "undefined").token._id;
      const res = await instanceBackend.get(`/auth/${token}`);
      updateUser(res.data.user)
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function loginWithUsernameAndPassword(
    username: string,
    password: string
  ) {
    try {
      const res = await instanceBackend.get(
        `/auth?username=${username}&password=${password}`
      );
      updateUser(res.data.user)
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function register(
    username: string,
    password: string,
    confirmPassword: string
  ) {
    if (password !== confirmPassword) return;
    try {
      const res = await instanceBackend.post("/auth", { username, password });
      updateUser(res.data.user)
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function setToken(token: string) {
    try {
      await AsyncStorage.setItem("ss-token", token);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function logout() {
    updateUser(null)
  }

  async function updateUser(newUser: UserType | null) {
    try {
      setUser(newUser);
      await AsyncStorage.setItem("SSUser", JSON.stringify(newUser));
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  return {
    user,
    loginWithUsernameAndPassword,
    register,
    logout,
    setToken,
    updateUser,
  };
}
