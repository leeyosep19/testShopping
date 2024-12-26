
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    addReview: (state, action) => {
      state.reviews.push(action.payload);
    },
    removeReview: (state, action) => {
      state.reviews = state.reviews.filter((review) => review.id !== action.payload);
    },
  },
});

export const { addReview, removeReview } = reviewSlice.actions;

export default reviewSlice.reducer;
