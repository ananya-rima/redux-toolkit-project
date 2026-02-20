import axiosInstance from "@/app/api/axios/axios";
import { endPoints } from "@/app/api/endPoints/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { number } from "yup";

interface Product {
  _id: string;
  title: string;
  subtitle: string;
  content: string;
}

interface ProductState {
  data: Product[];

  page: number;
  itemsPerPage: number;
  loading: boolean;
  search: string;
}

const initialState: ProductState = {
  data: [],

  page: 1,
  itemsPerPage: 8,
  loading: false,
  search: "",
};

export const createProduct = createAsyncThunk(
  "createProduct",
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(endPoints.product.create, payload);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const listProduct = createAsyncThunk(
  "listProduct",
  async (page: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `${endPoints.product.list}?limit=8&skip=${page * 8}`,
      );
      console.log("List Product Response:", res);
      return res.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "deleteProduct",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `${endPoints.product.delete}/${id}`,
      );
      return id; // 👈 return deleted product id
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  },
);
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, payload }:any,{rejectWithValue}) => {
    try {
      const res = await axiosInstance.put(
        `${endPoints.product.update}/${id}`,
        payload,
      );
      console.log("Update Product Response:", res.data);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
export const productDetails = createAsyncThunk(
  "productDetails",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`${endPoints.product.details}/${id}`);
      return res.data.data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    resetProduct(state) {
      state.data = [];
      state.page = 1;
      state.loading = false;
      state.itemsPerPage = 8;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    searchData(state, { payload }) {
      state.search = payload;
    },
  },

  extraReducers: (builder) => {
    builder
      // .addCase(createProduct.pending, (state, { payload }) => {
      //   state.loading=true;
      // })

      // .addCase(createProduct.fulfilled, (state, { payload }) => {
      //   if (payload.status == true) {
      //     state.data.push(payload.data);
      //     toast.success(payload.message);
      //   }
      // })

      // .addCase(createProduct.rejected, (state, { payload }) => {
      //   toast.error(payload.message);
      // })

      // /// product list

      // .addCase(listProduct.pending, (state, { payload }) => {
      //   state.loading = true;
      // })

      // .addCase(listProduct.fulfilled, (state, { payload }) => {
      //   state.data = payload;
      //   state.loading = false;
      // })

      // .addCase(listProduct.rejected, (state, { payload }) => {
      //   toast.error(payload.message);
      //   state.loading = false;
      // })

      // /// delete product

      // .addCase(deleteProduct.pending, (state, { payload }) => {})
      // .addCase(deleteProduct.fulfilled, (state, { payload }) => {
      //   if (payload) {
      //     state.data = state.data.filter((prod) => prod._id !== payload);
      //     toast.success("Product deleted successfully!!!");
      //   }
      // })
      // .addCase(deleteProduct.rejected, (state, { payload }) => {
      //   toast.error("Unable to delete!!!");
      // })

      // // search data

      // .addCase(updateProduct.pending, (state, { payload }) => {})

      // .addCase(updateProduct.fulfilled, (state, { payload }) => {
      //   state.data = payload;
      // })

      // .addCase(updateProduct.rejected, (state, { payload }) => {
      //   toast.error(payload.message);
      // })

      // .addCase(productDetails.pending, (state, { payload }) => {})

      // .addCase(productDetails.fulfilled, (state, { payload }) => {
      //   // You can handle the fulfilled state if needed
      //   state.data = payload;
      //   state.loading = false;
      // })

      // .addCase(productDetails.rejected, (state, { payload }) => {
      //   toast.error(payload.message);
      // });

      // CREATE
    .addCase(createProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.status) {
        state.data.push(action.payload.data);
        toast.success(action.payload.message);
      }
    })
    .addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.payload as string);
    })

    // LIST
    .addCase(listProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(listProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    })
    .addCase(listProduct.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.payload as string);
    })

    // DELETE
    .addCase(deleteProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.data = state.data.filter(
        (prod) => prod._id !== action.payload
      );
      toast.success("Product deleted successfully!");
    })
    .addCase(deleteProduct.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.payload as string);
    })

    // UPDATE
    .addCase(updateProduct.pending, (state) => {
      state.loading = true;
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
      state.loading = false;
      toast.success("Product updated successfully!");
    })
    .addCase(updateProduct.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.payload as string);
    })

    // DETAILS
    .addCase(productDetails.pending, (state) => {
      state.loading = true;
    })
    .addCase(productDetails.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(productDetails.rejected, (state, action) => {
      state.loading = false;
      toast.error(action.payload as string);
    });
  },
});

export const { resetProduct, searchData } = productSlice.actions;
export default productSlice;
