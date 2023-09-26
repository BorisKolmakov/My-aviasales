import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  all: true,
  nonStop: true,
  oneTransplant: true,
  twoTransplant: true,
  threeTransplant: true,
  types: { cheap: 'cheap', fast: 'fast', optimal: 'optimal' },
  choiceFilters: new Set(['nonStop', 'oneTransplant', 'twoTransplant', 'threeTransplant']),
  ticketsType: 'cheap',
};

const allFilters = ['nonStop', 'oneTransplant', 'twoTransplant', 'threeTransplant'];

export const filtersSlice = createSlice({
  name: 'sideBar',
  initialState,
  reducers: {
    setAll: (state, action) => {
      state.all = !action.payload;
      state.nonStop = !action.payload;
      state.oneTransplant = !action.payload;
      state.twoTransplant = !action.payload;
      state.threeTransplant = !action.payload;
      !action.payload ? allFilters.forEach((item) => state.choiceFilters.add(item)) : state.choiceFilters.clear();
    },
    setNonStop: (state, action) => {
      state.nonStop = !action.payload;
      !action.payload ? state.choiceFilters.add('nonStop') : state.choiceFilters.delete('nonStop');
    },
    setOneTransplant: (state, action) => {
      state.oneTransplant = !action.payload;
      !action.payload ? state.choiceFilters.add('oneTransplant') : state.choiceFilters.delete('oneTransplant');
    },
    setTwoTransplant: (state, action) => {
      state.twoTransplant = !action.payload;
      !action.payload ? state.choiceFilters.add('twoTransplant') : state.choiceFilters.delete('twoTransplant');
    },
    setThreeTransplant: (state, action) => {
      state.threeTransplant = !action.payload;
      !action.payload ? state.choiceFilters.add('threeTransplant') : state.choiceFilters.delete('threeTransplant');
    },
    setTicketType: (state, action) => {
      state.ticketsType = action.payload;
    },
  },
});

export const { setAll, setNonStop, setOneTransplant, setTwoTransplant, setThreeTransplant, setTicketType } =
  filtersSlice.actions;

export default filtersSlice.reducer;
