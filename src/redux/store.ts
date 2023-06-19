import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './slices/basket';

export const store = configureStore({
  reducer: {
    basketSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
