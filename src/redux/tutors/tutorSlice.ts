import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  tutorSignup,
  tutorVerifyEmail,
  tutorResendOtp,
  tutorSignin,
  forgotTutorPass,
  verifyTutorAccount,
  tutorResetPass,
  tutorGoogleSignin,
  tutorLogout
} from "./tutorActions";

interface TutorData {
  name: string;
  image: string;
  token: string;
  email: string;
  phone: string;
  followers: string;
  bio: string;
}

interface TutorState {
  tutorData: TutorData | null;
  tutorToken: string | null;
  success: boolean;
  error: string;
  loading: boolean;
  message: string;
  otpResendSuccess: boolean;
  otpResendError: string;
  otpResendLoading: boolean;
  otpVerifySuccess: boolean;
  otpVerifyLoading: boolean;
  otpVerifyError: string;
}

const initialState : TutorState = {
  tutorData: null,
  tutorToken: null,
  success: false,
  error: "",
  loading: false,
  message: "",
  otpResendSuccess: false,
  otpResendError: "",
  otpResendLoading: false,
  otpVerifySuccess: false,
  otpVerifyLoading: false,
  otpVerifyError: ""
};

const tutorSlice = createSlice({
  name: "tutor",
  initialState,
  reducers: {
    resetActions: (state) => {
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
      state.otpResendSuccess = false;
      state.otpResendError = "";
      state.otpResendLoading = false;
    },
    tutorLogoutLocal: (state) => {
      state.tutorData = null;
      state.tutorToken = null;
      state.success = false;
      state.error = "";
      state.loading = false;
      state.message = "";
    },
    setTutorData: (state, action: PayloadAction<{ data: TutorData; token: string }>) => {
      state.tutorData = action.payload.data;
      state.tutorToken = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(tutorSignup.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(tutorSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

      })
      .addCase(tutorSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(tutorResendOtp.pending, (state) => {
        state.otpResendLoading = true;
        state.otpResendError = "";
      })
      .addCase(tutorResendOtp.fulfilled, (state) => {
        state.otpResendLoading = false;
        state.otpResendSuccess = true;
      })
      .addCase(tutorResendOtp.rejected, (state, action) => {
        state.otpResendLoading = false;
        state.otpResendError = action.payload || "Something went wrong";
      })

      .addCase(tutorVerifyEmail.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(tutorVerifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tutorData = action.payload.tutorData;
        state.tutorToken = action.payload.tutorData.accessToken;
        state.message = "Signup successful";
      })
      .addCase(tutorVerifyEmail.rejected, (state, action) => {
        console.log("payload==========>", action.payload);
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(tutorSignin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(tutorSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tutorData = action.payload.tutorData;
        state.tutorToken = action.payload.tutorData.accessToken;
        state.message = "Signin successful";
      })
      .addCase(tutorSignin.rejected, (state, action) => {
        console.log("payload==========>", action.payload);
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(tutorGoogleSignin.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(tutorGoogleSignin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.tutorData = action.payload.tutorData;
        state.tutorToken = action.payload.tutorData.accessToken;
        state.message = "Signin successful";
      })
      .addCase(tutorGoogleSignin.rejected, (state, action) => {
        console.log("payload==========>", action.payload);
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(forgotTutorPass.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(forgotTutorPass.fulfilled, (state, action) => {
        console.log("paylooooooooad =========>", action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(forgotTutorPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(verifyTutorAccount.pending, (state) => {
        state.otpVerifyLoading = true;
        state.otpVerifyError = "";
      })
      .addCase(verifyTutorAccount.fulfilled, (state, action) => {
        console.log("paylooooooooad =========>", action.payload);
        state.otpVerifyLoading = false;
        state.otpVerifySuccess = true;
      })
      .addCase(verifyTutorAccount.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        state.otpVerifyError = action.payload || "Something went wrong";
      })

      .addCase(tutorResetPass.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(tutorResetPass.fulfilled, (state, action) => {
        console.log("paylooooooooad =========>", action.payload);
        state.loading = false;
        state.success = true;
      })
      .addCase(tutorResetPass.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      })

      .addCase(tutorLogout.pending, (state) => {
        state.loading = true;
      })
      .addCase(tutorLogout.fulfilled, (state) => {
        state.tutorData = null;
        state.tutorToken = null;
        state.loading = false;
      })
      .addCase(tutorLogout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Logout failed";
      });
  },
});

export const { resetActions, tutorLogoutLocal, setTutorData } = tutorSlice.actions;

export default tutorSlice.reducer;
