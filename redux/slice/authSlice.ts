
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axiosInstance from "@/app/api/axios/axios";
import { endPoints } from "@/app/api/endPoints/endPoints";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
interface AuthState {
  isOtpVerified: boolean;
  email: string | null;
  userId: string | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  success: string | boolean | null;
  name: string | null; 
  image: string | null; 
}
interface DecodedToken {
  id: string;
  email: string;
  name: string;
}


const initialState: AuthState = {
  isOtpVerified: false,
  email: null,
  userId: null,
  token: null,
  loading: false,
  error: null,
  success: null,
  name: null, 
  image: null, 
};


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
    setUser: (state, action) => {
    state.token = action.payload.token;
    state.email = action.payload.email;
    state.userId = action.payload.userId;
    state.name = action.payload.name;
  },
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
          state.email = action.payload.email; 
          state.userId = action.payload.userId; 

          toast.success(action.payload.message);
        }
      })
      .addCase(authOtp.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    
    builder
      .addCase(authLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(authLogin.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;

        if (action.payload.status) {
          const token = action.payload.token;

          if (token) {
            const decoded: any = jwtDecode(token);

            state.token = token;
            state.email = decoded.email;
            state.userId = decoded.id;
            state.name = decoded.name;
          }

          localStorage.setItem("token", token);
          toast.success(action.payload.message);
        }
      })
      .addCase(authLogin.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });

    
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

export const { logout, clearMessage, clearUpdateState, setToken,setUser } =
  authSlice.actions;
export default authSlice;
