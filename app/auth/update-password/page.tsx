"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, clearUpdateState } from "@/redux/slice/authSlice";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const schema = yup.object({
  oldPassword: yup.string().min(6, "Minimum 6 characters").required("Old password required"),
  newPassword: yup.string().min(6, "Minimum 6 characters").required("New password required"),
});

export default function UpdatePasswordPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const selector = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    // If success, redirect to login
    if (selector.success) {
      toast.success("Password updated successfully");
      dispatch(clearUpdateState());
      router.push("/auth/signin");
    }
  }, [selector.success]);

  const onSubmit = (data: any) => {
    dispatch(
      updatePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }) as any
    );
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
      <Card sx={{ width: 400, p: 2, borderRadius: 4 }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom sx={{ color: "#db2777", fontWeight: "bold" }}>
            Update Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Old Password"
              type="password"
              {...register("oldPassword")}
              error={!!errors.oldPassword}
              helperText={errors.oldPassword?.message}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="New Password"
              type="password"
              {...register("newPassword")}
              error={!!errors.newPassword}
              helperText={errors.newPassword?.message}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ backgroundColor: "#db2777", "&:hover": { backgroundColor: "#be185d" } }}
              disabled={selector.loading}
            >
              {selector.loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}