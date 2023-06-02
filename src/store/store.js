import { configureStore, createSlice } from "@reduxjs/toolkit";

const locationSlice = createSlice({
  name: "location",
  initialState: {
    locations: [],
  },
  reducers: {
    addLocation: (state, action) => {
      state.locations.push(action.payload);
    },
    deleteLocation: (state, action) => {
      state.locations = state.locations.filter(
        (location) => location !== action.payload
      );
    },
  },
});

const store = configureStore({
  reducer: {
    location: locationSlice.reducer,
  },
});

export const { addLocation, deleteLocation } = locationSlice.actions;
export default store;
