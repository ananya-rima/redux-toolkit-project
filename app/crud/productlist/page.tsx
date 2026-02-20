// "use client";
// import { deleteProduct, listProduct } from "@/redux/slice/productSlice";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import TableSkeletonRows from "@/component/skeletons/TableSkeletonRows";
// import "react-loading-skeleton/dist/skeleton.css";
// import { Autocomplete, TextField } from "@mui/material";
// import { searchData } from "@/redux/slice/productSlice";

// export default function listPage() {
//   const { data, page, itemsPerPage, loading, search } = useSelector(
//     (state) => state.product,
//   );
//   const dispatch = useDispatch();
//   const route = useRouter();
//   const [deleteId, setDeleteId] = useState("");
//   const [toggle, setToggle] = useState(false);

//   useEffect(() => {
//     dispatch(listProduct(page));
//   }, [dispatch, page]);

//   // Client-side Pagination
//   const start = (page - 1) * itemsPerPage;
//   const end = start + itemsPerPage;
//   // const paginated = data.slice(start, end);

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // -------------------- Delete Product --------------------
//   const handleDeleteClick = (id: string) => {
//     setDeleteId(id);
//     setToggle(true);
//   };

//   const handleConfirmDelete = () => {
//     if (!deleteId) return;

//     dispatch(deleteProduct(deleteId));
//     setToggle(false);
//   };

//   /* ---------------- PAGINATION ---------------- */
//   const handlePrev = () => {
//     if (page > 1) dispatch({ type: "product/setPage", payload: page - 1 });
//   };

//   const handleNext = () => {
//     if (page < totalPages)
//       dispatch({ type: "product/setPage", payload: page + 1 });
//   };

//   // filterable data for autocomplete
//   const filterData = Array.isArray(data)
//     ? data.filter((item) => {
//         return item.title.toLowerCase().includes(search.toLowerCase());
//       })
//     : [];

//   console.log(data, "data from list page");

//   return (
//     <div style={{ width: "700px", margin: "50px auto" }}>
//       <h1 className="text-2xl font-bold mb-4">Product List</h1>
//       <Autocomplete
//         disablePortal
//         // inputValue={input}
//         style={{ backgroundColor: "white" }}
//         options={data}
//         getOptionLabel={(option) => option.title}
//         sx={{ width: 300 }}
//         renderInput={(params) => <TextField {...params} label="Search Title" />}
//         onInputChange={(event, value, reason) => {
//           dispatch(searchData(value));
//         }}
//       />

//       {/* ---------------- Table ---------------- */}
//       <table
//         style={{
//           width: "100%",
//           borderCollapse: "collapse",
//           background: "#fff",
//           borderRadius: "5px",
//           overflow: "hidden",
//           color: "#000",
//         }}
//       >
//         <thead>
//           <tr style={{ background: "#fde5e5ff", height: "50px" }}>
//             <th style={th}>SL</th>
//             <th style={th}>Title</th>
//             <th style={th}>Subtitle</th>
//             <th style={th}>Content</th>
//             <th style={th}>Actions</th>
//           </tr>
//         </thead>

//         <tbody>
//           {!loading ? (
//             filterData?.length === 0 ? (
//               <tr>
//                 <td colSpan={5} className="text-center p-4">
//                   No products found
//                 </td>
//               </tr>
//             ) : (
//               Array.isArray(filterData) &&
//               filterData.map((item, index) => (
//                 <tr key={item._id} style={{ borderBottom: "1px solid #ddd" }}>
//                   <td>{start + index + 1}</td>
//                   <td style={td}>{item.title}</td>
//                   <td style={td}>{item.subtitle}</td>
//                   <td style={td}>{item.content}</td>
//                   <td style={td}>
//                     <div style={{ display: "flex", justifyContent: "center" }}>
//                       <Link
//                         href={`/crud/updateproduct/${item._id}`}
//                         style={editBtn}
//                       >
//                         Edit
//                       </Link>

//                       <button
//                         onClick={() => handleDeleteClick(item._id)}
//                         className="px-3 py-1 bg-red-500 text-white rounded"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))
//             )
//           ) : (
//             <TableSkeletonRows rows={6} />
//           )}
//         </tbody>
//       </table>

//       {/* ---------------- PAGINATION ---------------- */}
//       <div className="flex justify-center items-center gap-4 mt-6">
//         <button
//           onClick={handlePrev}
//           disabled={page === 1}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Prev
//         </button>

//         <span>
//           Page <strong>{page}</strong> of {totalPages}
//         </span>

//         <button
//           onClick={handleNext}
//           disabled={page === totalPages}
//           className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
//         >
//           Next
//         </button>
//       </div>

//       {/* ---------------- DELETE MODAL ---------------- */}
//       {toggle && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
//           <div className="bg-white p-6 rounded shadow-lg w-80">
//             <p className="text-lg mb-4">Are you sure you want to delete?</p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={handleConfirmDelete}
//                 className="px-4 py-2 bg-red-500 text-white rounded"
//               >
//                 Yes, Delete
//               </button>

//               <button
//                 onClick={() => setToggle(false)}
//                 className="px-4 py-2 bg-gray-300 rounded"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* <Link to="/product/create" style={createBtn}>Create Product</Link>
//           {toggle && <HandleDelete handleDelete={handleDelete} />} */}
//     </div>
//   );
// }

// // -------------------- CSS Styles --------------------
// const th = {
//   padding: "10px",
//   textAlign: "center",
//   fontWeight: "bold",
// };

// const td = {
//   padding: "10px",
//   verticalAlign: "top",
// };

// const editBtn = {
//   padding: "5px 12px",
//   background: "#50a2f9ff",
//   color: "white",
//   border: "none",
//   marginRight: "8px",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const deleteBtn = {
//   padding: "5px 12px",
//   background: "#f85151ff",
//   color: "white",
//   border: "none",
//   borderRadius: "4px",
//   cursor: "pointer",
// };

// const pBtn = {
//   padding: "6px 12px",
//   borderRadius: "4px",
//   border: "1px solid #000",
//   background: "#fff",
//   color: "#000",
//   cursor: "pointer",
// };

// const createBtn = {
//   padding: "6px 12px",
//   backgroundColor: "#48a0feff",
//   color: "#fff",
//   borderRadius: "8px",
// };



"use client";

import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, listProduct, searchData } from "@/redux/slice/productSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ListPage() {
  const { data, page, itemsPerPage, loading, search } = useSelector(
    (state: any) => state.product
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(listProduct(page));
  }, [dispatch, page]);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(deleteId));
    setOpen(false);
  };

  const handlePrev = () => {
    if (page > 1)
      dispatch({ type: "product/setPage", payload: page - 1 });
  };

  const handleNext = () => {
    if (page < totalPages)
      dispatch({ type: "product/setPage", payload: page + 1 });
  };

  const filterData = Array.isArray(data)
    ? data.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #fdf2f8, #e0f2fe)",
        p: 5,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          maxWidth: 1000,
          mx: "auto",
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          mb={3}
          sx={{ color: "#db2777" }}
        >
          Product Dashboard
        </Typography>

        {/* Search */}
        <Autocomplete
          options={data}
          getOptionLabel={(option: any) => option.title}
          onInputChange={(event, value) => dispatch(searchData(value))}
          renderInput={(params) => (
            <TextField {...params} label="Search Title" />
          )}
          sx={{ mb: 3, width: 300 }}
        />

        {/* Table */}
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#fbcfe8" }}>
              <TableCell><strong>SL</strong></TableCell>
              <TableCell><strong>Title</strong></TableCell>
              <TableCell><strong>Subtitle</strong></TableCell>
              <TableCell><strong>Content</strong></TableCell>
              <TableCell align="center"><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {filterData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No products found
                </TableCell>
              </TableRow>
            ) : (
              filterData.map((item: any, index: number) => (
                <TableRow key={item._id} hover>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.subtitle}</TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell align="center">
                    <Stack direction="row" spacing={1} justifyContent="center">
                      <Link href={`/crud/updateproduct/${item._id}`}>
                        <Button
                          variant="contained"
                          sx={{
                            background: "#db2777",
                            "&:hover": { background: "#be185d" },
                          }}
                        >
                          Edit
                        </Button>
                      </Link>

                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDeleteClick(item._id)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <Button
            variant="outlined"
            disabled={page === 1}
            onClick={handlePrev}
          >
            Prev
          </Button>

          <Typography>
            Page <strong>{page}</strong> of {totalPages}
          </Typography>

          <Button
            variant="outlined"
            disabled={page === totalPages}
            onClick={handleNext}
          >
            Next
          </Button>
        </Stack>
      </Paper>

      {/* Delete Modal */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>
          Are you sure you want to delete this product?
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button
            onClick={handleConfirmDelete}
            sx={{
              background: "#db2777",
              color: "#fff",
              "&:hover": { background: "#be185d" },
            }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
