import { apiClient } from "./api";
import { User } from "../context/AuthContext";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post<AuthResponse>("/auth/login", credentials);
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signup(data: SignupRequest): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API endpoint
      const response = await apiClient.post<AuthResponse>("/auth/signup", data);
      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // TODO: Replace with actual API endpoint if needed
      localStorage.removeItem("auth_token");
    } catch (error) {
      throw error;
    }
  }

  getToken(): string | null {
    return localStorage.getItem("auth_token");
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();
