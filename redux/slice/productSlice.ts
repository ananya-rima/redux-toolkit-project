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
  details: Product | null;
  total: number;

  page: number;
  itemsPerPage: number;
  loading: boolean;
  search: string;
}

const initialState: ProductState = {
  data: [],
  details: null,
  total: 0,

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
        `${endPoints.product.list}?limit=8&skip=${(page - 1) * 8}`,
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
      return id; 
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  },
);
export const updateProduct = createAsyncThunk(
  "updateProduct",
  async ({ id, payload }: any, { rejectWithValue }) => {
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

      
      .addCase(listProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(listProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
        state.total = action.payload.total;
      })
      .addCase(listProduct.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload as string);
      })

      
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter((prod) => prod._id !== action.payload);
        toast.success("Product deleted successfully!");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload as string);
      })

     
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
      })

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;

        const updatedProduct = action.payload.data; 
        const id = updatedProduct._id; 

        if (Array.isArray(state.data)) {
          state.data = state.data.map((item) =>
            item._id === id ? updatedProduct : item,
          );
        }

        toast.success("Product updated successfully!");
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload as string);
      })

      
      .addCase(productDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(productDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.details = action.payload;
      })
      .addCase(productDetails.rejected, (state, action) => {
        state.loading = false;
        toast.error(action.payload as string);
      });
  },
});

export const { resetProduct, searchData } = productSlice.actions;
export default productSlice;
