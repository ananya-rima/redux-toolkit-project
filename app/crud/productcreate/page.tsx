// "use client";

// import React, { useRef, useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";

// import { useNavigate } from "react-router-dom";
// import axiosInstance from "@/app/api/axios/axios";
// import { endPoints } from "@/app/api/endPoints/endPoints";
// import { useRouter } from "next/navigation";
// import { useDispatch, useSelector } from "react-redux";
// import { createProduct } from "@/redux/slice/productSlice";

// const schema = yup.object({
//   title: yup.string().required("Title is required"),
//   subtitle: yup.string().required("Subtitle is required"),
//   content: yup
//     .string()
//     .min(10, "Content must be at least 10 characters")
//     .required("Content is required"),
// });

// type ProductForm = {
//   title: string;
//   subtitle: string;
//   content: string;
// };

// export default function CreateProduct() {
//   const [products, setProducts] = useState([]);
//   // const [message, setMessage] = useState("")
//   // const [loading, setLoading] = useState(false)
//   // const [error, setError] = useState(null)
//   const titleRef = useRef(null);

//   const route = useRouter();
//   const dispatch = useDispatch();
//   const selector = useSelector((state) => state.product);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     setFocus,
//     formState: { errors, isSubmitting },
//   } = useForm<ProductForm>({
//     resolver: yupResolver(schema),
//   });

//   const handleAddItem = async (data: ProductForm) => {
//     // setLoading(true)
//     // setMessage("")

//     const result = await dispatch(createProduct(data));
//     if (result.payload.status === true) {
//       // CLEAR FORM
//       reset();
//       // auto-focus title after reset
//       setTimeout(() => {
//         titleRef.current?.focus();
//       }, 100);
//     }
//   };

//   const handleAddAndSubmit = async (data: ProductForm) => {
//     const result = await dispatch(createProduct(data));

//     if (result.payload.status === true) {
//       reset();
//       // redirect to productList
//       route.push("/crud/productlist");
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <div style={styles.card}>
//         <h2 style={styles.heading}>Create Product</h2>

//         <form className="space-y-4">
//           {/* Title */}
//           <div style={styles.field}>
//             <label>Title</label>
//             <input
//               {...register("title")}
//               ref={(el) => {
//                 register("title").ref(el); // give ref to RHF
//                 titleRef.current = el; // also keep your own ref
//               }}
//               style={styles.input}
//               placeholder="Enter title"
//             />
//             {errors.title && <p style={styles.error}>{errors.title.message}</p>}
//           </div>

//           {/* Subtitle */}
//           <div style={styles.field}>
//             <label>Subtitle</label>
//             <input
//               {...register("subtitle")}
//               style={styles.input}
//               placeholder="Enter subtitle"
//             />
//             {errors.subtitle && (
//               <p style={styles.error}>{errors.subtitle.message}</p>
//             )}
//           </div>

//           {/* Content */}
//           <div style={styles.field}>
//             <label>Content</label>
//             <textarea
//               {...register("content")}
//               style={styles.textarea}
//               placeholder="Enter content(minimum ten characters)"
//             />
//             {errors.content && (
//               <p style={styles.error}>{errors.content.message}</p>
//             )}
//           </div>

//           {/* Buttons */}
//           <div className="flex gap-4">
//             <button
//               type="button"
//               onClick={handleSubmit(handleAddItem)}
//               className="bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Add More
//             </button>

//             <button
//               type="button"
//               onClick={handleSubmit(handleAddAndSubmit)}
//               className="bg-green-600 text-white px-4 py-2 rounded"
//             >
//               Add & Go to List
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // ------------------ STYLES ---------------------
// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "40px",
//   },
//   card: {
//     width: "450px",
//     padding: "20px",
//     borderRadius: "12px",
//     background: "#fff",
//     boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
//   },
//   heading: {
//     textAlign: "center",
//     marginBottom: "20px",
//     textDecoration: "underLine",
//     color: "#007bff",
//     fontSize: "28px",
//   },
//   field: {
//     marginBottom: "5px",
//     display: "flex",
//     flexDirection: "column",
//   },
//   input: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     background: "#faefefff",
//     color: "#000",
//   },
//   textarea: {
//     padding: "10px",
//     borderRadius: "6px",
//     border: "1px solid #ccc",
//     height: "90px",
//     background: "#faefefff",
//     color: "#000",
//   },
//   error: {
//     color: "red",
//     fontSize: "12px",
//     marginTop: "4px",
//   },
//   button: {
//     width: "45%",
//     padding: "8px 12px",
//     background: "#007bff",
//     color: "#fff",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginTop: "20px",
//   },

//   finalButton: {
//     padding: "8px 35px",
//     background: "#0560c2ff",
//     color: "#fff",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginTop: "10px",
//   },

//   buttonDisabled: {
//     width: "100%",
//     padding: "12px",
//     background: "#888", // Greyed-out look
//     color: "#fff",
//     borderRadius: "8px",
//     border: "none",
//     cursor: "not-allowed",
//     fontWeight: "600",
//     fontSize: "16px",
//     marginTop: "20px",
//     opacity: 0.7,
//   },
// };




// "use client";

// import React, { useRef } from "react";
// import {
//   Box,
//   TextField,
//   Button,
//   Typography,
//   Paper,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useRouter } from "next/navigation";
// import { useDispatch } from "react-redux";
// import { createProduct } from "@/redux/slice/productSlice";

// const schema = yup.object({
//   title: yup.string().required("Title is required"),
//   subtitle: yup.string().required("Subtitle is required"),
//   content: yup
//     .string()
//     .min(10, "Content must be at least 10 characters")
//     .required("Content is required"),
// });

// type ProductForm = {
//   title: string;
//   subtitle: string;
//   content: string;
// };

// export default function CreateProduct() {
//   const titleRef = useRef<HTMLInputElement | null>(null);
//   const router = useRouter();
//   const dispatch = useDispatch();

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<ProductForm>({
//     resolver: yupResolver(schema),
//   });

//   const handleAddItem = async (data: ProductForm) => {
//     const result: any = await dispatch(createProduct(data));

//     if (result.payload.status) {
//       reset();
//       setTimeout(() => {
//         titleRef.current?.focus();
//       }, 100);
//     }
//   };

//   const handleAddAndSubmit = async (data: ProductForm) => {
//     const result: any = await dispatch(createProduct(data));

//     if (result.payload.status) {
//       reset();
//       router.push("/crud/productlist");
//     }
//   };

//   return (
//   <Box
//     sx={{
//       minHeight: "100vh",
//       display: "flex",
//       backgroundColor: "#f8fafc",
//     }}
//   >
//     {/* LEFT IMAGE / INFO SECTION */}
//     <Box
//       sx={{
//         flex: 1,
//         display: { xs: "none", md: "flex" },
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(135deg, #e3f2fd, #fce4ec)",
//         padding: 6,
//       }}
//     >
//       <Typography
//         variant="h3"
//         fontWeight="bold"
//         sx={{ color:"#db2777", mb: 2 }}
//       >
//         Product Dashboard
//       </Typography>

//       <Typography
//         variant="body1"
//         sx={{ color: "#334155", maxWidth: 400, textAlign: "center" }}
//       >
//         Create and manage your products in a structured and efficient way.
//         Keep everything organized with a clean interface.
//       </Typography>
//     </Box>

    

//     {/* RIGHT FORM SECTION */}
//     <Box
//       sx={{
//         flex: 1,
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         padding: 4,
//       }}
//     >
//       <Paper
//         elevation={6}
//         sx={{
//           width: "100%",
//           maxWidth: 450,
//           padding: 4,
//           borderRadius: 3,
//         }}
//       >
//         <Typography
//           variant="h4"
//           fontWeight="bold"
//           mb={3}
//           sx={{ color: "#2563eb", textAlign: "center" ,letterSpacing: 1,}}
//         >
//           Create Product
//         </Typography>

//         <form>
//           <TextField
//             fullWidth
//             label="Title"
//             margin="normal"
//             {...register("title")}
//             inputRef={titleRef}
//             error={!!errors.title}
//             helperText={errors.title?.message}
//           />

//           <TextField
//             fullWidth
//             label="Subtitle"
//             margin="normal"
//             {...register("subtitle")}
//             error={!!errors.subtitle}
//             helperText={errors.subtitle?.message}
//           />

//           <TextField
//             fullWidth
//             label="Content"
//             margin="normal"
//             multiline
//             rows={4}
//             {...register("content")}
//             error={!!errors.content}
//             helperText={errors.content?.message}
//           />

//           <Box mt={3} display="flex" gap={2}>
//             <Button
//               fullWidth
//               variant="contained"
//               sx={{
//                 backgroundColor: "#2563eb",
//                 "&:hover": { backgroundColor: "#1d4ed8" },
//               }}
//               onClick={handleSubmit(handleAddItem)}
//             >
//               Add More
//             </Button>

//             <Button
//               fullWidth
//               variant="outlined"
//               sx={{
//                 borderColor: "#2563eb",
//                 color: "#2563eb",
//               }}
//               onClick={handleSubmit(handleAddAndSubmit)}
//             >
//               Add & Go
//             </Button>
//           </Box>
//         </form>
//       </Paper>
//     </Box>
//   </Box>
// );

// }



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
  const selector=useSelector((state:any)=>state.product);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: yupResolver(schema),
  });

  const handleAddItem = async (data: ProductForm) => {
    const result: any = await dispatch(createProduct(data));
    if (result.payload.status === true) {
      reset();
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
        background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)", // soft pink full page
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
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={4}
          sx={{
            color: "#db2777", // changed from blue
            letterSpacing: 1,
          }}
        >
          Create Product
        </Typography>

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
