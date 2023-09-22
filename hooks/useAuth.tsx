import { useEffect, useState } from "react";
import { UserType } from "../types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instanceBackend } from "../config/constants";

export default function useAuth() {
  const [user, setUser] = useState<UserType | null>(null);

  // useEffect(() => {
  //   loginWithToken();
  // }, []);

  async function loginWithToken() {
    try {
      const token = await AsyncStorage.getItem("SSToken");
      const res = await instanceBackend.get(`/auth/token?token=${token}`);
      console.log(res.data);
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
      console.log(res.data);
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

  async function logout() {
    try {
      setUser(null);
      await AsyncStorage.setItem("ss-token", "");
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function updateUser(newUser: UserType | null) {
    setUser(newUser);
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
