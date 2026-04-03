"use client";

import { useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, Avatar } from "@mui/material";

export default function ProfilePage() {
  const { email, userId, token, image } = useSelector(
    (state: any) => state.auth,
  );

  const username = email?.split("@")[0] || "User";
  console.log("Auth State:", { email, token, userId, image });
  console.log("username", username);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fdf2f8 0%, #e0f2fe 100%)",
        p: 2,
      }}
    >
      <Card
        sx={{
          width: 450,
          p: 4,
          borderRadius: 5,
          textAlign: "center",
          backdropFilter: "blur(10px)",
          background: "rgba(255,255,255,0.95)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Avatar
          src={image ? `http://localhost:4000/${image}` : "/image.jpeg"}
          alt={username}
          sx={{
            width: 150,
            height: 150,
            mx: "auto",
            mb: 3,
            objectFit: "contain",
            bgcolor: "#f0f0f0",
          }}
        />

        <CardContent>
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            {username}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            Email: {email}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
