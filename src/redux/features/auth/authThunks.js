import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../API/axiosInstance";

const saveToken = (token) => {
  localStorage.setItem("token", token);
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const removeToken = () => {
  localStorage.removeItem("token");
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/auth/login", credentials);
      const { access_token: token } = response.data;

      saveToken(token);

      return { token, user: response.data.user };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const loadUserFromToken = createAsyncThunk(
  "auth/loadUserFromToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      saveToken(token);

      const response = await axiosInstance.get("/auth/profile");
      return response.data;
    } catch (error) {
      removeToken();
      return rejectWithValue(error.response?.data?.message || "Failed to load user");
    }
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (userDetails, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/users", userDetails);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Signup failed");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      removeToken();
      return true;
    } catch (error) {
      return rejectWithValue("Failed to log out");
    }
  }
);