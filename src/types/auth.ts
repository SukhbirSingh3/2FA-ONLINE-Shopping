export interface User {
  id: string;
  email: string;
  password: string; // This would be hashed in a real application
  isVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  otpSent: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}