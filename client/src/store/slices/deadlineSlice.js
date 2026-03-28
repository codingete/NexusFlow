import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";
import { toast } from "react-toastify";

// Async thunk for creating deadlines
export const createDeadline = createAsyncThunk(
  "deadline/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/deadlines", data);
      toast.success("Deadline created!");
      return response.data;
    } catch (error) {
      toast.error("Failed to create deadline");
      return rejectWithValue(error.response?.data || "Error creating deadline");
    }
  }
);

const deadlineSlice = createSlice({
  name: "deadline",
  initialState: {
    deadlines: [],
    nearby: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDeadline.pending, (state) => {
        state.loading = true;
      })
      .addCase(createDeadline.fulfilled, (state, action) => {
        state.loading = false;
        state.deadlines.push(action.payload);
      })
      .addCase(createDeadline.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default deadlineSlice.reducer;
