import { apiClient } from "@/services/api";
import React, { createContext, useContext, useReducer, ReactNode,useEffect } from "react";
import { jwtDecode } from "jwt-decode";
export interface User {
  id: string;
  email: string;
  name: string;
  accountStatus: "inactive" | "active" | "verified";
  createdAt: Date;
  referralCode: string;
}

interface LoginResponse {
  user: User;
  token: string;
  refreshToken: string;
}
export interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

type AuthAction =
  | { type: "LOGIN_START" }
  | { type: "LOGIN_SUCCESS"; payload: LoginResponse }
  | { type: "LOGIN_FAIL"; payload: string }
  | { type: "LOGOUT" }
  | { type: "SIGNUP_START" }
  | { type: "SIGNUP_SUCCESS"; payload: User }
  | { type: "SIGNUP_FAIL"; payload: string }
  | { type: "CLEAR_ERROR" };

const initialState: AuthState = {
  user: null,
  token: null,
  refreshToken: null,
  isLoading: false,
  isAuthenticated: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "LOGIN_START":
    case "SIGNUP_START":
      return { ...state, isLoading: true, error: null };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: null,
      };
    case "SIGNUP_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        error: null,
      };
    case "LOGIN_FAIL":
    case "SIGNUP_FAIL":
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case "LOGOUT":
      return { ...state, isAuthenticated: false, user: null };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
 useEffect(() => {
  const token = localStorage.getItem("auth_token");
  const user = localStorage.getItem("user");
  const refreshToken = localStorage.getItem("refresh_token");

  if (token && user) {
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: {
        user: JSON.parse(user),
        token,
        refreshToken,
      } as any,
    });
  }
}, []);
  const login = async (email: string, password: string) => {
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await apiClient.post<LoginResponse>("/auth/login", {
        email,
        password,
      });

      const { user,  token, refreshToken } = res.data;
      // store in locastoreage
      localStorage.setItem("auth_token", token);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem('user',JSON.stringify(user))
      // Decode token
      const decoded: any = jwtDecode(token);

      // decoded will look like:
      // { userId, iat, exp }

      const authuser: User = {
        id: decoded.userId,
        email: email,
        name: res.data.user.name,
        accountStatus: res.data.user.accountStatus,
        createdAt: new Date(decoded.iat * 1000),
        referralCode: "",
      };

      console.log(authuser.accountStatus);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          authuser,
          token,
          refreshToken,
        } as any,
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: "LOGIN_FAIL",
        payload: error instanceof Error ? error.message : "Login Failed",
      });
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    dispatch({ type: "SIGNUP_START" });
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const mockUser: User = {
        id: "user-" + Math.random().toString(36).substr(2, 9),
        email,
        name,
        accountStatus: "inactive",
        createdAt: new Date(),
        referralCode:
          "REF" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      };
      dispatch({ type: "SIGNUP_SUCCESS", payload: mockUser });
    } catch (error) {
      dispatch({
        type: "SIGNUP_FAIL",
        payload: error instanceof Error ? error.message : "Signup failed",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value: AuthContextType = {
    ...state,
    login,
    signup,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
