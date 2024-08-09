export interface SigninData {
  email: string;
  password: string;
}

export interface AdminData {
  _id: string;
  email: string;
  name: string;
  password: string;
  __v: number;
  token: string;
}

export interface AdminResponse {
  message: string;
  adminData: AdminData;
}

export interface StudentSignupData {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface StudentVerifyOtp {
  email: string;
  otp: string;
}

export interface StudentResendOtp {
  email: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type SetStudentInterestsPayload = {
  interests: string[];
  email: string;
};

export interface StudentResetPassData {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface TutorSignupData {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmPassword: string;
  role: string;
}

export interface TutorVerifyOtp {
  email: string;
  otp: string;
}

export interface TutorResetPassData {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}
