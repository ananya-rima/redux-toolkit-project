// "use client";

// import { authLogin } from "@/redux/slice/authSlice";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { Cookies } from "react-cookie";
// import { useForm } from "react-hook-form";
// import { useDispatch, useSelector } from "react-redux";
// import * as yup from "yup";
// import Link from "next/link";

// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   TextField,
//   Typography,
// } from "@mui/material";

// const schema = yup.object({
//   email: yup.string().email("Invalid email").required("Email is required"),
//   password: yup
//     .string()
//     .min(6, "Minimum 6 characters")
//     .max(20, "Maximum 20 characters")
//     .required("Password is required"),
// });

// export default function LoginPage() {
//   const router = useRouter();
//   const cookies = new Cookies();
//   const dispatch = useDispatch();
//   const selector = useSelector((state) => state.auth);

//   const [message, setMessage] = useState("");
//   const [success, setSuccess] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const result = await dispatch(authLogin(data)).unwrap();

//       if (result.status == true) {
//         cookies.set("token", result.token, { path: "/" });
//         router.push("/crud/productcreate");
//       }
//     } catch (err) {
//       setSuccess(false);
//       setMessage(err);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: { xs: "column", md: "row" },
//       }}
//     >
//       {/* LEFT SIDE IMAGE */}
//       <Box
//         sx={{
//           flex: 1,
//           backgroundImage:
//             "url(https://images.unsplash.com/photo-1492724441997-5dc865305da7)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           minHeight: { xs: 250, md: "100vh" },
//         }}
//       />

//       {/* RIGHT SIDE CONTENT */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#f4f6f8",
//           p: 4,
//         }}
//       >
//         {/* Welcome Text */}
//         <Box textAlign="center" mb={3}>
//           <Typography
//             variant="h4"
//             fontWeight="bold"
//             gutterBottom
//             sx={{ color: "primary.main" }}
//           >
//             Welcome Back
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ color: "primary.main", opacity: 0.8 }}
//           >
//             Login to continue to your dashboard.
//           </Typography>
//         </Box>

//         {/* Login Form */}
//         <Card sx={{ width: 400, p: 2, borderRadius: 3 }}>
//           <CardContent>
//             <Box
//               component="form"
//               onSubmit={handleSubmit(onSubmit)}
//               sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//             >
//               <TextField
//                 label="Email"
//                 fullWidth
//                 {...register("email")}
//                 error={!!errors.email}
//                 helperText={errors.email?.message}
//               />

//               <TextField
//                 label="Password"
//                 type="password"
//                 fullWidth
//                 {...register("password")}
//                 error={!!errors.password}
//                 helperText={errors.password?.message}
//               />

//               <Button
//                 type="submit"
//                 variant="contained"
//                 size="large"
//                 disabled={selector.loading}
//                 sx={{
//                   mt: 1,
//                   borderRadius: 2,
//                   textTransform: "none",
//                 }}
//               >
//                 {selector.loading ? "Loading..." : "Login"}
//               </Button>
//             </Box>

//             {(message || selector.error) && (
//               <Box
//                 sx={{
//                   mt: 3,
//                   p: 2,
//                   borderRadius: 2,
//                   textAlign: "center",
//                   backgroundColor: success
//                     ? "rgba(76,175,80,0.1)"
//                     : "rgba(244,67,54,0.1)",
//                   color: success ? "green" : "red",
//                 }}
//               >
//                 {message || selector.error}
//               </Box>

//             )}
//           </CardContent>
//         </Card>
//       </Box>
//     </Box>
//   );
// }

"use client";

import { authLogin } from "@/redux/slice/authSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import Link from "next/link";
import { toast } from "sonner";

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Minimum 6 characters")
    .max(20, "Maximum 20 characters")
    .required("Password is required"),
});

export default function LoginPage() {
  const router = useRouter();
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.auth);

  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function LoginToast() {
    const searchParams = useSearchParams();
    useEffect(() => {
      const reason = searchParams.get("reason");
      if (reason === "auth-required") {
        toast.error("⚠️ Login first to continue");
      }
    }, [searchParams]);

    return null; // just for toast
  }

  const onSubmit = async (data: any) => {
    try {
      const result = await dispatch(authLogin(data)).unwrap();

      if (result.status == true) {
        cookies.set("token", result.token, { path: "/" });
        setSuccess(true);
        router.push("/crud/productcreate");
      }
    } catch (err: any) {
      setSuccess(false);
      setMessage(err);
    }
  };

  return (
    <>
    <LoginToast/>
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)",
      }}
    >
      {/* LEFT SIDE IMAGE */}
      <Box
        sx={{
          flex: 1,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1492724441997-5dc865305da7)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: { xs: 250, md: "100vh" },
        }}
      />

      {/* RIGHT SIDE CONTENT */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        {/* Heading */}
        <Box textAlign="center" mb={3}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{ color: "#db2777" }}
          >
            Welcome Back
          </Typography>
          <Typography variant="body1" sx={{ color: "#db2777", opacity: 0.8 }}>
            Login to continue to your dashboard.
          </Typography>
        </Box>

        {/* Login Card */}
        <Card
          sx={{
            width: 400,
            p: 2,
            borderRadius: 4,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
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

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={selector.loading}
                sx={{
                  mt: 1,
                  borderRadius: 3,
                  textTransform: "none",
                  backgroundColor: "#db2777",
                  "&:hover": {
                    backgroundColor: "#be185d",
                  },
                }}
              >
                {selector.loading ? "Loading..." : "Login"}
              </Button>

              {/* Divider Line */}
              <Box
                sx={{
                  borderTop: "1px solid #eee",
                  mt: 3,
                  pt: 2,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  component={Link}
                  href="/auth/forgotpassword"
                  sx={{
                    fontSize: "14px",
                    color: "#db2777",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password?
                </Typography>
                <Typography
                  component={Link}
                  href="/auth/update-password"
                  sx={{
                    fontSize: "14px",
                    color: "#db2777",
                    textDecoration: "none",
                    fontWeight: 500,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Update Password
                </Typography>
              </Box>

              {/* Register Redirect */}
              <Box
                sx={{
                  mt: 2,
                  textAlign: "center",
                }}
              >
                <Typography variant="body2" sx={{ color: "#555" }}>
                  Don't have an account?{" "}
                  <Link
                    href="/auth/signup"
                    style={{
                      color: "#db2777",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Register
                  </Link>
                </Typography>
              </Box>
              
            </Box>

            {(message || selector.error) && (
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  borderRadius: 2,
                  textAlign: "center",
                  backgroundColor: success
                    ? "rgba(76,175,80,0.1)"
                    : "rgba(244,67,54,0.1)",
                  color: success ? "green" : "red",
                }}
              >
                {message || selector.error}
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
    </>
  );

}
