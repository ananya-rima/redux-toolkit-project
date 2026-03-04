


"use client";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  productDetails,
  updateProduct,
} from "@/redux/slice/productSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  subtitle: yup.string().required("Subtitle is required"),
  content: yup.string().required("Content is required"),
});

export default function UpdateProduct() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();

  const {details} = useSelector((state: any) => state.product);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const hasFetched = useRef(false);
  // useEffect(() => {
  //   if (id) {
  //     dispatch<any>(productDetails(id));
  //   }
  // }, [id, dispatch]);

  useEffect(() => {
  if (id && !hasFetched.current) {
    dispatch(productDetails(id));
    hasFetched.current = true;
  }
}, [id]);

  useEffect(() => {
    if (details) {
      setValue("title", details.title || "");
      setValue("subtitle", details.subtitle || "");
      setValue("content", details.content || "");
    }
  }, [details, setValue]);

  const handleUpdate = async (data: any) => {
    const updateData = {
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
    };
    console.log("ID:", id);
  console.log("Sending updateData:", updateData);

    const result=await dispatch<any>(updateProduct({ id, payload: updateData }));
     console.log("Update Result:", result);
    if (result.meta.requestStatus === "fulfilled"){
      router.push("/crud/productlist")
    };
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 4,
      }}
    >
      <Paper
        elevation={8}
        sx={{
          width: 500,
          p: 5,
          borderRadius: 4,
          background: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={4}
          sx={{
            color: "#db2777",
            letterSpacing: 1,
          }}
        >
          Update Product
        </Typography>

        <form onSubmit={handleSubmit(handleUpdate)}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              fullWidth
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
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

            <Button
              type="submit"
              variant="contained"
              sx={{
                background: "#db2777",
                py: 1.3,
                fontWeight: "bold",
                "&:hover": {
                  background: "#be185d",
                },
              }}
            >
              Finish Update
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
}