import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

const timeWindowSlice = createSlice({
  name: 'timeWindow',
  initialState: {
    longWindow: 12,
    shortWindow: 2,
  },
  reducers: {
    setLongWindow: (state, action: PayloadAction<number>) => {
      state.longWindow = action.payload;
    },
    setShortWindow: (state, action: PayloadAction<number>) => {
      state.shortWindow = action.payload;
    },
  },
});

export const { setLongWindow, setShortWindow } = timeWindowSlice.actions;

const store = configureStore({
  reducer: {
    timeWindow: timeWindowSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
