import { createSlice } from '@reduxjs/toolkit';

export interface ToastsSlice {
  burgerState: boolean;
  filterState: boolean;
}

const initialState: ToastsSlice = {
  burgerState: false,
  filterState: false,
};

export const CatalogSlice = createSlice({
  name: 'catalogSlice',
  initialState,
  reducers: {
    toggleBurger: state => {
      state.burgerState = !state.burgerState;
    },
    toggleFilter: state => {
      state.filterState = !state.filterState;
    },
  },
});

export const { toggleBurger, toggleFilter } = CatalogSlice.actions;

export default CatalogSlice.reducer;
