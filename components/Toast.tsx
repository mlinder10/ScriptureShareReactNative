import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../config/constants";

type ToastProps = {
  message: string | null;
  setMessage: Dispatch<SetStateAction<string | null>>;
  duration?: number;
  color?: string;
};

export default function Toast({
  message,
  setMessage,
  duration = 2000,
  color = colors.text,
}: ToastProps) {
  useEffect(() => {
    if (message === null) return;
    setMessage(message);

    setTimeout(() => {
      setMessage(null);
    }, duration);
  }, [message]);

  return (
    <>
      {message !== null && (
        <View style={styles.container}>
          <Text style={[styles.text, { color }]}>{message}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: colors.bgSecondary,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    top: 20,
    left: 20,
    right: 20,
    minHeight: 20,
    padding: 20,
  },
  text: {
    fontSize: 16,
  },
});
