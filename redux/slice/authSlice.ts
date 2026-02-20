// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// import axiosInstance from "@/app/api/axios/axios";
// import { endPoints } from "@/app/api/endPoints/endPoints";
// import { toast } from "sonner";
// import { stat } from "fs";
// const initialState = {
//   isOtpVerified: false,
//   email: null,
//   userId: null,
//   token: null,
//    loading: false,
//   error: null,
//   success: null,
// };

// export const authRegistration = createAsyncThunk(
//   "authRegistration",
//   async (payload) => {
//     const response = await axiosInstance.post(endPoints.auth.signUp, payload);

//     return response.data;
//   },
// );

// export const authOtp = createAsyncThunk("authOtp", async (payload) => {
//   const res = await axiosInstance.post(endPoints.auth.otp, payload);
//   console.log(res, "otp response in slice");

//   return res.data;
// });

// export const authLogin = createAsyncThunk("authLogin", async (payload) => {
//   const res = await axiosInstance.post(endPoints.auth.signIn, payload);
//   return res.data;
// });
// // 🔹 Forgot Password (Reset Email)
// export const resetEmail = createAsyncThunk(
//   "authResetEmail",
//   async (payload: { email: string }, { rejectWithValue }) => {
//     try {
//       const response = await axiosInstance.post(
//         endPoints.auth.resetemail,
//         payload,
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

// // 🔹 Reset Password (from link)
// export const resetPassword = createAsyncThunk(
//   "authResetPassword",
//   async (
//     {
//       userId,
//       token,
//       password,
//       confirm_password,
//     }: {
//       userId: string;
//       token: string;
//       password: string;
//       confirm_password: string;
//     },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axiosInstance.post(
//         `${endPoints.auth.resetlink}/${userId}/${token}`,
//         { password, confirm_password }
//       );
//       return response.data;
//     } catch (error: any) {
//       return rejectWithValue(error.response?.data?.message);
//     }
//   }
// );

// // Thunk for updating password
// export const updatePassword = createAsyncThunk(
//   "auth/updatePassword",
//   async (
//     data: { oldPassword: string; newPassword: string },
//     thunkAPI
//   ) => {
//     try {
//       const response = await axiosInstance.put("/auth/update-password", data);
//       return response.data;
//     } catch (error: any) {
//       return thunkAPI.rejectWithValue(
//         error.response?.data?.message || "Update password failed"
//       );
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "authSlice",
//   initialState,
//   reducers: {
//     logout:(state,action) => {
//       state.userId=null;
//       state.email=null;
//       state.token=null;

//   },
//    clearMessage: (state) => {
//       state.error = null;
//       state.success = null;
//     },
//   },

//   extraReducers: (builder) => {
//     builder
//       //registration
//       .addCase(authRegistration.pending, (state, { payload }) => {})

//       .addCase(authRegistration.fulfilled, (state, { payload }) => {
//         if (payload.status == true) {
//           localStorage.setItem("Id", payload.user.id);
//           state.email = payload.user.email;
//           toast.success(payload.message);
//         }
//       })

//       .addCase(authRegistration.rejected, (state, { payload }) => {})

//       //otp
//       .addCase(authOtp.pending, (state, { payload }) => {})
//       .addCase(authOtp.fulfilled, (state, { payload }) => {
//         if (payload.status === true) {
//           state.isOtpVerified = true;
//           toast.success(payload.message);
//         }
//       })
//       .addCase(authOtp.rejected, (state, { payload }) => {})

//       // login
//       .addCase(authLogin.pending, (state, { payload }) => {})
//       .addCase(authLogin.fulfilled, (state, { payload }) => {
//         if (payload.status == true) {
//           localStorage.setItem("Id", payload.user.id);
//           localStorage.setItem("email", payload.user.email);
//           toast.success(payload.message);
//         }
//       })
//       .addCase(authLogin.rejected, (state, { payload }) => {})

//        .addCase(resetEmail.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(resetEmail.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.message;
//       })
//       .addCase(resetEmail.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })

//       .addCase(resetPassword.pending, (state) => {
//         state.loading = true;
//       })
//       .addCase(resetPassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = action.payload.message;
//       })
//       .addCase(resetPassword.rejected, (state, action: any) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updatePassword.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//         state.success = false;
//       })
//       .addCase(updatePassword.fulfilled, (state, action) => {
//         state.loading = false;
//         state.success = true;
//         toast.success(action.payload.message || "Password updated successfully");
//       })
//       .addCase(updatePassword.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         toast.error(action.payload as string);
//       });
//   },
// });

// //  export const { setOtp, clearOtp, logout } = authSlice.actions;
// export const { logout, clearMessage } = authSlice.actions;
// export default authSlice;

// authSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/app/api/axios/axios";
import { endPoints } from "@/app/api/endPoints/endPoints";
import { toast } from "sonner";

interface AuthState {
  isOtpVerified: boolean;
  email: string | null;
  userId: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | boolean | null;
  name: string | null; // add name to state
  image: string | null; // add image to state if you have profile images
}

const initialState: AuthState = {
  isOtpVerified: false,
  email: null,
  userId: null,
  token: null,
  loading: false,
  error: null,
  success: null,
  name: null, // add name to state
  image: null, // add image to state if you have profile images
};

// ✅ Registration
export const authRegistration = createAsyncThunk(
  "auth/registration",
  async (
    payload: { name: string; email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(endPoints.auth.signUp, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed",
      );
    }
  },
);

// ✅ OTP Verification
export const authOtp = createAsyncThunk(
  "auth/otp",
  async (payload: { userId: string; otp: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.auth.otp, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "OTP verification failed",
      );
    }
  },
);

// ✅ Login
export const authLogin = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(endPoints.auth.signIn, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  },
);

// 🔹 Forgot Password (Reset Email)
export const resetEmail = createAsyncThunk(
  "auth/resetEmail",
  async (payload: { email: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        endPoints.auth.resetemail,
        payload,
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Reset email failed",
      );
    }
  },
);

// 🔹 Reset Password (from link)
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (
    {
      userId,
      token,
      password,
      confirm_password,
    }: {
      userId: string;
      token: string;
      password: string;
      confirm_password: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.post(
        `${endPoints.auth.resetlink}/${userId}/${token}`,
        { password, confirm_password },
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Reset password failed",
      );
    }
  },
);

// 🔹 Update Password (logged-in user)
export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (
    payload: { oldPassword: string; newPassword: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosInstance.put(endPoints.auth.update, payload);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Update password failed",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.userId = null;
      state.email = null;
      state.token = null;
      state.isOtpVerified = false;
      state.success = null;
      state.error = null;
      localStorage.removeItem("token");
    },
    clearMessage: (state) => {
      state.error = null;
      state.success = null;
    },
    clearUpdateState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Registration
    builder
      .addCase(authRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        authRegistration.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          if (action.payload.status) {
            state.email = action.payload.user.email;
            state.userId = action.payload.user.id;
            state.image = action.payload.user.imagePath; // <-- add this
            toast.success(action.payload.message);
          }
        },
      )
      .addCase(
        authRegistration.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
          toast.error(action.payload);
        },
      );

    // OTP
    builder
      .addCase(authOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.status) {
          state.isOtpVerified = true;
          state.email = action.payload.email; // store email if needed
          state.userId = action.payload.userId; // store userId if needed

          toast.success(action.payload.message);
        }
      })
      .addCase(authOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    // Login
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(authLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        if (action.payload.status) {
          state.userId = action.payload.user.id;
          state.email = action.payload.user.email;
          state.token = action.payload.token;
          state.name = action.payload.user.name; // add this
          state.image = action.payload.user.imagePath; // add if you have profile image
          localStorage.setItem("token", action.payload.token);
          toast.success(action.payload.message);
        }
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    // Reset Email
    builder
      .addCase(resetEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetEmail.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(resetEmail.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    // Reset Password (via link)
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.success = action.payload.message;
        toast.success(action.payload.message);
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    // Update Password
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(
        updatePassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.success = true;
          toast.success(
            action.payload.message || "Password updated successfully",
          );
        },
      )
      .addCase(updatePassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});

export const { logout, clearMessage, clearUpdateState,setToken } = authSlice.actions;
export default authSlice;
