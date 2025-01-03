import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const task = action.payload;
      const index = state.favorites.findIndex((favTask) => favTask.id === task.id);

      if (index === -1) {
        state.favorites.push(task);
      } else {
        state.favorites.splice(index, 1); 
      }
    },
  },
});

export const { toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
