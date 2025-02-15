import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import API from "../../services/api.js"

// Async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  const response = await API.post('/user/login', credentials);
  console.log("my data is ")
  console.log(response);
  localStorage.setItem('access_token', response.data.data.accessToken); // Store the token in localStorage
  return response.data;
});

// Async thunk for registration
export const register = createAsyncThunk('auth/register', async (credentials) => {
  const response = await axios.post('http://localhost:5000/user/register', credentials);
  return response.data;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('access_token') || null,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('access_token'); // Remove token on logout
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = 'succeeded';
      })
      .addCase(register.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
