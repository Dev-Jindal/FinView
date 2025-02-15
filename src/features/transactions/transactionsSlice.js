import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../services/api';

export const createTransaction = createAsyncThunk('transactions/createTransaction', async ({ amount, receiver, narration }, thunkAPI) => {
  try {
    console.log(typeof amount)
    amount=Number(amount);
    console.log(typeof amount)
    console.log(amount)
    const response = await API.post('/trans/create', { amount, receiver, narration });
    console.log(response.data)
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getInsights = createAsyncThunk('transactions/getInsights', async ({ fromDate, toDate, categories }, thunkAPI) => {
  try {

    console.log("hi i am in transactionslice.js")
    const response = await API.post('/trans/insights', { fromDate, toDate, categories });
    console.log(response.data)
    return response.data.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    data: null,
    insights: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getInsights.pending, (state) => {
        state.loading = true;
      })
      .addCase(getInsights.fulfilled, (state, action) => {
        state.loading = false;
        state.insights = action.payload;
      })
      .addCase(getInsights.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default transactionsSlice.reducer;
