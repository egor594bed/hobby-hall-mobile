import { createSlice } from '@reduxjs/toolkit';

export interface ToastsSlice {
  burgerState: boolean;
}

const initialState: ToastsSlice = {
  burgerState: false,
};

export const CatalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    toggleBurger: state => {
      state.burgerState = !state.burgerState;
    },
  },
});

export const { toggleBurger } = CatalogSlice.actions;

export default CatalogSlice.reducer;
