// "use client";

// import { resetPassword } from "@/redux/slice/authSlice";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useParams, useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";

// const schema = yup.object({
//   password: yup
//     .string()
//     .min(6, "Minimum 6 characters")
//     .required("Password required"),
//   confirm_password: yup
//     .string()
//     .min(6, "Minimum 6 characters")
//     .required("Confirm password required"),
// });

// export default function ResetPasswordPage() {
//   const { userId, token } = useParams();
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const selector = useSelector((state: any) => state.auth);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data: any) => {
//     const result = await dispatch(
//       resetPassword({
//         userId: userId as string,
//         token: token as string,
//         password: data.password,
//         confirm_password: data.confirm_password,
//       }) as any
//     );

//     if (result.meta.requestStatus === "fulfilled") {
//       router.push("/login");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)",
//       }}
//     >
//       <Card sx={{ width: 400, p: 2, borderRadius: 4 }}>
//         <CardContent>
//           <Typography
//             variant="h5"
//             align="center"
//             gutterBottom
//             sx={{ color: "#db2777", fontWeight: "bold" }}
//           >
//             Change Password
//           </Typography>

//           <form onSubmit={handleSubmit(onSubmit)}>
//             <TextField
//               fullWidth
//               label="New Password"
//               type="password"
//               {...register("password")}
//               error={!!errors.password}
//               helperText={errors.password?.message}
//               sx={{ mb: 2 }}
//             />

//             <TextField
//               fullWidth
//               label="Confirm Password"
//               type="password"
//               {...register("confirm_password")}
//               error={!!errors.confirm_password}
//               helperText={errors.confirm_password?.message}
//               sx={{ mb: 2 }}
//             />

//             <Button
//               fullWidth
//               type="submit"
//               variant="contained"
//               sx={{
//                 backgroundColor: "#db2777",
//                 "&:hover": { backgroundColor: "#be185d" },
//               }}
//             >
//               {selector.loading ? "Updating..." : "Update Password"}
//             </Button>
//           </form>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }



"use client";

import { resetPassword } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const selector = useSelector((state: any) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const result = await dispatch(
      resetPassword({
        userId: userId as string,
        token: token as string,
        password: data.password,
        confirm_password: data.confirm_password,
      }) as any
    );

    if (result.meta.requestStatus === "fulfilled") {
      toast.success("Password updated successfully!");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 2000);
    } else {
      toast.error(result.payload || "Something went wrong!");
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
      <ToastContainer />

      <Card sx={{ width: 400, p: 2, borderRadius: 4 }}>
        <CardContent>
          <Typography
            variant="h5"
            align="center"
            gutterBottom
            sx={{ color: "#db2777", fontWeight: "bold" }}
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
              {selector.loading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}