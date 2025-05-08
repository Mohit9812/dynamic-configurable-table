import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  columns: [],
  data: [],
  visibleColumns: [],
  filters: [],
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    setColumns: (state, action) => {
      state.columns = action.payload;
      if (!state.visibleColumns.length) {
        state.visibleColumns = action.payload.filter(col => col.visible).map(col => col.key);
      }
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    setVisibleColumns: (state, action) => {
      state.visibleColumns = action.payload;
    },
    toggleColumnVisibility: (state, action) => {
      const key = action.payload;
      if (state.visibleColumns.includes(key)) {
        state.visibleColumns = state.visibleColumns.filter(colKey => colKey !== key);
      } else {
        state.visibleColumns.push(key);
      }
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    updateCell: (state, action) => {
      const { rowIndex, key, value } = action.payload;
      if (state.data[rowIndex]) {
        state.data = state.data.map((row, index) =>
          index === rowIndex ? { ...row, [key]: value } : row
        );
      }
    },
  },
});

export const {
  setColumns,
  setData,
  toggleColumnVisibility,
  setVisibleColumns,
  setFilters,
  updateCell,
} = tableSlice.actions;

export default tableSlice.reducer;
