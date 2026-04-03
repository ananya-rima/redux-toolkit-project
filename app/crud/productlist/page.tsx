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
import {
  deleteProduct,
  listProduct,
  searchData,
} from "@/redux/slice/productSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Tooltip } from "@mui/material";

export default function ListPage() {
  const { data, page, itemsPerPage, loading, search } = useSelector(
    (state: any) => state.product,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [deleteId, setDeleteId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(listProduct());
  }, []);

  const handleDeleteClick = (id: string) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteProduct(deleteId));
    setOpen(false);
  };

  const handlePrev = () => {
    if (page > 1) dispatch({ type: "product/setPage", payload: page - 1 });
  };

  const handleNext = () => {
    if (page < totalPages)
      dispatch({ type: "product/setPage", payload: page + 1 });
  };

  const filterData = Array.isArray(data)
    ? data.filter((item: any) =>
        item.title.toLowerCase().includes(search.toLowerCase()),
      )
    : [];
  const totalPages = Math.ceil(filterData.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const paginatedData = filterData.slice(start, end);

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
          maxWidth: { xs: "100%", md: 1000 },
          mx: "auto",
          p: { xs: 2, md: 4 },
          borderRadius: 4,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ color: "#db2777" }}>
            Product Dashboard
          </Typography>

          <Button
            variant="contained"
            onClick={() => router.push("/crud/productcreate")}
            sx={{
              backgroundColor: "#e39fbd",
              backdropFilter: "blur(8px)",
              color: "#db2777",
              border: "1px solid rgba(51, 65, 85, 0.3)",
              borderRadius: 3,
              textTransform: "none",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "rgba(51, 65, 85, 0.25)",
                transform: "translateY(-2px)",
              },
            }}
          >
            + Create Product
          </Button>
        </Box>

        <Autocomplete
          options={data}
          getOptionLabel={(option: any) => option.title}
          onInputChange={(event, value) => dispatch(searchData(value))}
          renderInput={(params) => (
            <TextField {...params} label="Search Title" />
          )}
          sx={{ mb: 3, width: 300 }}
        />

        <Box sx={{ overflowX: "auto" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ background: "#fbcfe8" }}>
                <TableCell>
                  <strong>SL</strong>
                </TableCell>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Subtitle</strong>
                </TableCell>
                <TableCell>
                  <strong>Content</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
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
                paginatedData.map((item: any, index: number) => (
                  <TableRow key={item._id} hover>
                    <TableCell>{start + index + 1}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.subtitle}</TableCell>
                    <TableCell>{item.content}</TableCell>

                    <TableCell align="center">
                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                      >
                        <Link href={`/crud/updateproduct/${item._id}`}>
                          <Tooltip title="Edit Product">
                            <IconButton
                              sx={{
                                color: "#334155",
                                "&:hover": { backgroundColor: "#e2e8f0" },
                              }}
                            >
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                        </Link>

                        <Tooltip title="Delete Product">
                          <IconButton
                            onClick={() => handleDeleteClick(item._id)}
                            sx={{
                              color: "#be123c",
                              transition: "all 0.2s ease",
                              "&:hover": { backgroundColor: "#ffe4e6" },
                              transform: "scale(1.08)",
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Box>

        <Stack
          direction="row"
          spacing={3}
          justifyContent="center"
          alignItems="center"
          mt={4}
        >
          <Button variant="outlined" disabled={page === 1} onClick={handlePrev}>
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

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Are you sure you want to delete this product?</DialogTitle>

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
