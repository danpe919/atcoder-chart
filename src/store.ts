import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { URLSearchParams } from 'url';

const params = new URL(window.location.href).searchParams;
const longWindow = Number(params.get('long') ?? '12');
const shortWindow = Number(params.get('short') ?? '2');

const timeWindowSlice = createSlice({
  name: 'timeWindow',
  initialState: {
    longWindow: longWindow,
    shortWindow: shortWindow,
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
