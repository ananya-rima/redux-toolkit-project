"use client";

import { authRegistration } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import * as yup from "yup";
import Link from "next/link";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  address: yup.string().required("Address is required"),
  email: yup.string().email("Invalid Email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(20, "Password cannot exceed 20 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
  profileImage: yup.mixed().required("Image is required"),
});

export default function Register() {
  const [img, setImg] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();
   const selector = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const imageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImg(file);
      clearErrors("profileImage");
    } else {
      alert("Please upload a valid image file");
    }
  };

  const handleClick = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", img);

    try {
      let res = await dispatch(authRegistration(formData)).unwrap();
      if (res.status === true) {
        router.push("/auth/otp");
      } else {
        router.push("/auth/signUp");
      }
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
      }}
    >
     
      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: 250, md: "100vh" },
        }}
      />

     
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f4f6f8",
          p: 4,
        }}
      >
        
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h3"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#db2777" }}
          >
            Welcome
          </Typography>

          <Typography variant="body1" sx={{ color: "#db2777", opacity: 0.8 }}>
            Create your account and start your journey with us.
          </Typography>
        </Box>

        
        <Card sx={{ width: 400, p: 2, borderRadius: 3 }}>
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit(handleClick)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              <TextField
                label="First Name"
                fullWidth
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
              />

              <TextField
                label="Address"
                fullWidth
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
              />

              <TextField
                label="Email"
                fullWidth
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />

              <TextField
                label="Password"
                type="password"
                fullWidth
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />

              <TextField
                label="Confirm Password"
                type="password"
                fullWidth
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />

              <Button
                variant="outlined"
                component="label"
                sx={{ textTransform: "none" }}
              >
                Upload Profile Image
                <input
                  type="file"
                  hidden
                  {...register("profileImage")}
                  onChange={imageChange}
                />
              </Button>

              {errors.profileImage && (
                <Typography variant="body2" color="error">
                  {errors.profileImage.message}
                </Typography>
              )}

              {img && (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="Preview"
                    style={{
                      width: 120,
                      height: 120,
                      objectFit: "cover",
                      borderRadius: "50%",
                      border: "1px solid #ccc",
                      marginTop: "5px",
                    }}
                  />
                </Box>
              )}

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={selector.loading}
                sx={{
                  mt: 1,
                  borderRadius: 2,
                  textTransform: "none",
                }}
              >
                {selector.loading ? "Registering..." : "Register"}
              </Button>
            </Box>
           
            <Box
              sx={{
                mt: 2,
                textAlign: "center",
              }}
            >
              <Typography variant="body2" sx={{ color: "#555" }}>
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  style={{
                    color: "#db2777",
                    fontWeight: 600,
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
