

// "use client";

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/navigation";
// import {
//   Box,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   CircularProgress,
// } from "@mui/material";
// import { listProduct, deleteProduct } from "@/redux/slice/productSlice";
// import type { AppDispatch, RootState } from "@/redux/store/store";

// export default function ProductList() {
//   const dispatch = useDispatch<AppDispatch>();
//   const router = useRouter();

//   const { products, loading } = useSelector(
//     (state: RootState) => state.product
//   );

//   useEffect(() => {
//     dispatch(listProduct());
//   }, [dispatch]);

//   const handleDelete = (id: string) => {
//     dispatch(deleteProduct(id));
//   };

//   return (
//     <Box
      
//         // width: "100%",
//         // maxWidth: "1200px",
//         // mx: "auto",
//         // mt: 4,
//         // px: 2,
//         sx={{
//         width: "100%",
//         maxWidth: "1200px",
//         margin: "0 auto",
//         padding: "20px",
//         overflow: "hidden", // 🔥 prevents page overflow
//       }}
//     >
//       <Typography variant="h4" sx={{ mb: 3, fontWeight: 600 }}>
//         Product List
//       </Typography>

//       <Button
//         variant="contained"
//         sx={{ mb: 2 }}
//         onClick={() => router.push("/create-product")}
//       >
//         Create Product
//       </Button>

//       {loading ? (
//         <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <TableContainer
//           component={Paper}
//           sx={{
//             width: "100%",
//             overflowX: "auto",   // 🔥 Important: prevents overflow
//           }}
//         >
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Sl</TableCell>
//                 <TableCell>Name</TableCell>
//                 <TableCell>Price</TableCell>
//                 <TableCell>Category</TableCell>
//                 <TableCell align="center">Actions</TableCell>
//               </TableRow>
//             </TableHead>

//             <TableBody>
//               {products?.length === 0 ? (
//                 <TableRow>
//                   <TableCell colSpan={5} align="center">
//                     No Products Found
//                   </TableCell>
//                 </TableRow>
//               ) : (
//                 products?.map((product: any, index: number) => (
//                   <TableRow key={product._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{product.name}</TableCell>
//                     <TableCell>₹ {product.price}</TableCell>
//                     <TableCell>{product.category}</TableCell>
//                     <TableCell align="center">
//                       <Button
//                         size="small"
//                         variant="outlined"
//                         sx={{ mr: 1 }}
//                         onClick={() =>
//                           router.push(`/edit-product/${product._id}`)
//                         }
//                       >
//                         Edit
//                       </Button>

//                       <Button
//                         size="small"
//                         variant="contained"
//                         color="error"
//                         onClick={() => handleDelete(product._id)}
//                       >
//                         Delete
//                       </Button>
//                     </TableCell>
//                   </TableRow>
//                 ))
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listProduct, deleteProduct } from "@/redux/slice/productSlice";
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";

export default function ProductList() {
  const dispatch = useDispatch<any>();
  const { data, loading, page } = useSelector(
    (state: any) => state.product
  );

  useEffect(() => {
    dispatch(listProduct(page));
  }, [dispatch, page]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        overflowX: "hidden", // 👈 prevents horizontal overflow
        py: 5,
        backgroundColor: "#f9fafb",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
        >
          Product List
        </Typography>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {data?.map((item: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item._id}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    boxShadow: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>

                    <Typography variant="body2" sx={{ my: 1 }}>
                      {item.subtitle}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {item.content}
                    </Typography>
                  </CardContent>

                  <Box sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="error"
                      onClick={() =>
                        dispatch(deleteProduct(item._id))
                      }
                    >
                      Delete
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}