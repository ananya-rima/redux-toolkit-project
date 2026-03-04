

"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import {setUser} from "@/redux/slice/authSlice"

interface DecodedToken {
  id: string;
  email: string;
  name: string;
}

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode<DecodedToken>(token);

      dispatch(
        setUser({
          token,
          email: decoded.email,
          userId: decoded.id,
          name: decoded.name,
        })
      );
    }
  }, [dispatch]);

  return null;
}