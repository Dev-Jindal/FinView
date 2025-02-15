import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch user profile
export const fetchProfile = createAsyncThunk('profile/fetchProfile', async () => {
  console
  const token = localStorage.getItem('access_token');
  const response = await axios.get('http://localhost:5000/user/profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("inside fetch profile of profileSlice.js");
  console.log(response.data.data.userWithoutPassword);
  return response.data.data.userWithoutPassword;
});

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default profileSlice.reducer;
