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
      const res = await instanceBackend.get(`/auth/${jsonUser.token._id}`);
      setUser(res.data.user);
    } catch (err: any) {
      setUser(null);
    }
  }

  async function loginWithUsernameAndPassword(
    username: string,
    password: string
  ) {
    try {
      if (username === "" || password === "") return "Empty field(s)";
      const res = await instanceBackend.get(
        `/auth?username=${username}&password=${password}`
      );
      updateUser(res.data.user);
      return null;
    } catch (err: any) {
      return err.response.data.message;
    }
  }

  async function register(
    username: string,
    password: string,
    confirmPassword: string
  ) {
    if (username.length < 3 || username.length > 12)
      return "Username must be between three and twelve characters";
    if (password.length < 8 || password.length > 20)
      return "Password must be between eight and twenty characters";
    if (password !== confirmPassword) return "Password fields must match";
    try {
      const res = await instanceBackend.post("/auth", { username, password });
      updateUser(res.data.user);
      return null;
    } catch (err: any) {
      return err.response.data.message;
    }
  }

  async function setToken(token: string) {
    try {
      await AsyncStorage.setItem("ss-token", token);
    } catch (err: any) {}
  }

  async function updateUser(newUser: UserType | null) {
    try {
      setUser(newUser);
      await AsyncStorage.setItem("SSUser", JSON.stringify(newUser));
    } catch (err: any) {}
  }

  async function fetchFriends() {
    if (user === null) return;
    try {
      const res = await instanceBackend.get(`/user/friends/${user._id}`);
      setFriends(res.data.friends);
    } catch (err: any) {}
  }

  function logout() {
    updateUser(null);
  }

  useEffect(() => {
    fetchFriends();
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
