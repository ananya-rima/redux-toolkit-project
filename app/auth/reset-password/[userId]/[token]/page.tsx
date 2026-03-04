

"use client";

import { resetPassword } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

const schema = yup.object({
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .required("Password required"),

  confirm_password: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password required"),
});

export default function ResetPasswordPage() {
  const { userId, token } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);

      await dispatch(
        resetPassword({
          userId: userId as string,
          token: token as string,
          password: data.password,
          confirm_password: data.confirm_password,
        })
      ).unwrap();

      toast.success("Password updated successfully!");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 1500);

    } catch (error: any) {
      toast.error(error || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)",
      }}
    >
      <ToastContainer position="top-center" />

      <Card
        sx={{
          width: 420,
          p: 3,
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        }}
      >
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#db2777", fontWeight: "bold", mb: 3 }}
          >
            Change Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register("password")}
              error={!!errors.password}
              helperText={errors.password?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              {...register("confirm_password")}
              error={!!errors.confirm_password}
              helperText={errors.confirm_password?.message}
              sx={{ mb: 3 }}
            />

            <LoadingButton
              fullWidth
              type="submit"
              variant="contained"
              loading={loading}
              sx={{
                backgroundColor: "#db2777",
                borderRadius: 2,
                fontWeight: "bold",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#be185d",
                },
              }}
            >
              Update Password
            </LoadingButton>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}