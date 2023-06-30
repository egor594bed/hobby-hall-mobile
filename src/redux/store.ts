import { configureStore } from '@reduxjs/toolkit';
import basketSlice from './slices/basket';
import catalogSlice from './slices/catalog';

export const store = configureStore({
  reducer: {
    basketSlice,
    catalogSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
