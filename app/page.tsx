
"use client";

import { logout } from "@/redux/slice/authSlice";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Cookies } from "react-cookie";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cookies = new Cookies();

  const { token } = useSelector((state: any) => state.auth);

  const [registerLoading, setRegisterLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [createLoading, setCreateLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = () => {
    setLogoutLoading(true);
    cookies.remove("token", { path: "/" });
    dispatch(logout());
    router.push("/");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(https://images.unsplash.com/photo-1492724441997-5dc865305da7)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "white",
        px: 2,
      }}
    >
      <Box>
        <Typography
          variant="h2"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(90deg, #db2777, #f472b6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Welcome to Your Dashboard
        </Typography>

        <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
          Manage your products beautifully with a premium experience.
        </Typography>
        
        {!token ? (
         
          <LoadingButton
            loading={loginLoading}
            variant="outlined"
            size="large"
            sx={{
              borderColor: "#db2777",
              color: "#fff",
              borderRadius: 3,
              px: 4,
              "&:hover": {
                borderColor: "#be185d",
                backgroundColor: "rgba(219,39,119,0.1)",
              },
            }}
            onClick={() => {
              setLoginLoading(true);
              router.push("/auth/signin");
            }}
          >
            Login
          </LoadingButton>
        ) : (
         
          <>
            <LoadingButton
              loading={createLoading}
              variant="contained"
              size="large"
              sx={{
                mr: 2,
                backgroundColor: "#db2777",
                "&:hover": { backgroundColor: "#be185d" },
                borderRadius: 3,
                px: 4,
              }}
              onClick={() => {
                setCreateLoading(true);
                router.push("/crud/productcreate");
              }}
            >
              Create Product
            </LoadingButton>

            <LoadingButton
              loading={logoutLoading}
              variant="outlined"
              size="large"
              sx={{
                borderColor: "#fff",
                color: "#fff",
                borderRadius: 3,
                px: 4,
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.1)",
                },
              }}
              onClick={handleLogout}
            >
              Logout
            </LoadingButton>
          </>
        )}
      </Box>
    </Box>
  );
}
