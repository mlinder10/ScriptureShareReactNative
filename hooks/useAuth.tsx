import { useEffect, useState } from "react";
import { UserType } from "../config/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { instanceBackend } from "../config/constants";

export default function useAuth() {
  const [user, setUser] = useState<UserType | null>(null);
  const [friends, setFriends] = useState<UserType[]>([]);

  async function loginWithToken() {
    try {
      const user = await AsyncStorage.getItem("SSUser");
      if (user === null) return;
      const jsonUser = JSON.parse(user);
      if (jsonUser === null) return;
      setUser(jsonUser);
      await instanceBackend.get(`/auth/${jsonUser.token._id}`);
    } catch (err: any) {
      console.error(err?.message);
      setUser(null);
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
      updateUser(res.data.user);
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
      updateUser(res.data.user);
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

  async function updateUser(newUser: UserType | null) {
    try {
      setUser(newUser);
      await AsyncStorage.setItem("SSUser", JSON.stringify(newUser));
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  async function fetchFriends() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(`/user/friends/${user._id}`);
      setFriends(res.data.friends);
    } catch (err: any) {
      console.error(err?.message);
    }
  }

  function logout() {
    updateUser(null);
  }

  useEffect(() => {
    fetchFriends()
  }, [user]);

  useEffect(() => {
    loginWithToken();
  }, []);

  return {
    user,
    friends,
    loginWithUsernameAndPassword,
    register,
    logout,
    setToken,
    updateUser,
  };
}
