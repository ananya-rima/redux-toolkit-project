"use client";

import { resetEmail } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
});

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(resetEmail(data) as any);
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
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#db2777", fontWeight: "bold" }}
          >
            Forgot Password
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ mb: 2 }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: "#db2777",
                "&:hover": { backgroundColor: "#be185d" },
              }}
            >
              {selector.loading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          {selector.success && (
            <Typography color="green" mt={2}>
              {selector.success}
            </Typography>
          )}

          {selector.error && (
            <Typography color="red" mt={2}>
              {selector.error}
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
