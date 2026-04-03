

"use client";

import React, { useRef } from "react";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "@/redux/slice/productSlice";


const schema = yup.object({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  content: yup
    .string()
    .min(10, "Content must be at least 10 characters")
    .required("Content is required"),
});

type ProductForm = {
  title: string;
  subtitle: string;
  content: string;
};

export default function CreateProduct() {
  const router = useRouter();
  const dispatch = useDispatch();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const selector = useSelector((state: any) => state.product);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      subtitle: "",
      content: "",
    },
  });

  const handleAddItem = async (data: ProductForm) => {
    const result: any = await dispatch(createProduct(data));
    if (result.payload.status === true) {
     
      reset({
        title: "",
        subtitle: "",
        content: "",
      });
      setTimeout(() => {
        titleRef.current?.focus();
      }, 100);
    }
  };

  const handleAddAndSubmit = async (data: ProductForm) => {
    const result: any = await dispatch(createProduct(data));
    if (result.payload.status === true) {
      reset();
      router.push("/crud/productlist");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)", 
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "500px",
          p: 5,
          borderRadius: 4,
          background: "#ffffff",
        }}
      >
        <Box
          mb={4}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: "#db2777",
              letterSpacing: 1,
            }}
          >
            Create Product
          </Typography>
        </Box>

        <Stack spacing={3}>
          <TextField
            label="Title"
            fullWidth
            {...register("title")}
            inputRef={titleRef}
            error={!!errors.title}
            helperText={errors.title?.message}
            color="secondary"
          />

          <TextField
            label="Subtitle"
            fullWidth
            {...register("subtitle")}
            error={!!errors.subtitle}
            helperText={errors.subtitle?.message}
          />

          <TextField
            label="Content"
            multiline
            rows={4}
            fullWidth
            {...register("content")}
            error={!!errors.content}
            helperText={errors.content?.message}
          />

          <Stack direction="row" spacing={2}>
            <Button
              fullWidth
              variant="contained"
              disabled={selector.loading}
              onClick={handleSubmit(handleAddItem)}
              sx={{
                background: "#db2777",
                "&:hover": {
                  background: "#be185d",
                },
              }}
            >
              {selector.loading ? "Adding..." : "Add More"}
            </Button>

            <Button
              fullWidth
              variant="outlined"
              disabled={selector.loading}
              onClick={handleSubmit(handleAddAndSubmit)}
              sx={{
                borderColor: "#db2777",
                color: "#db2777",
                "&:hover": {
                  borderColor: "#be185d",
                  backgroundColor: "#fce7f3",
                },
              }}
            >
              {selector.loading ? "Processing..." : "Add & Go to List"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
