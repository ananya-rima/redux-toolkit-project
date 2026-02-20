import { configureStore } from "@reduxjs/toolkit";
import {} from "process";
import authSlice from "../slice/authSlice";
import productSlice from "../slice/productSlice";


const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    product: productSlice.reducer,

  },
});


export default store;