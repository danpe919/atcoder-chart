import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { URLSearchParams } from 'url';

const params = new URL(window.location.href).searchParams;
const longWindow = Number(params.get('long') ?? '12');
const shortWindow = Number(params.get('short') ?? '2');

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    longWindow: longWindow,
    shortWindow: shortWindow,
    ratedOnly: true,
  },
  reducers: {
    setLongWindow: (state, action: PayloadAction<number>) => {
      state.longWindow = action.payload;
    },
    setShortWindow: (state, action: PayloadAction<number>) => {
      state.shortWindow = action.payload;
    },
    setShowUnrated: (state, action: PayloadAction<boolean>) => {
      state.ratedOnly = action.payload;
    },
  },
});

export const {
  setLongWindow,
  setShortWindow,
  setShowUnrated,
} = settingsSlice.actions;

const store = configureStore({
  reducer: {
    settings: settingsSlice.reducer,
  },
});
export default store;
export type RootState = ReturnType<typeof store.getState>;
