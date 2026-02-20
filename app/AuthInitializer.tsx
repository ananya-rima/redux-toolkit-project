"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slice/authSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return null;
}