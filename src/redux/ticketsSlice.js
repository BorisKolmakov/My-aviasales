import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getTickets = async () => {
  const searchId = await fetch('https://aviasales-test-api.kata.academy/search');
  const searchIdResponse = await searchId.json();

  const tickets = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchIdResponse.searchId}`);
  const TicketsResponse = await tickets.json();
  return TicketsResponse;
};

export const fetchTickets = createAsyncThunk('tickets/fetchSearchId', getTickets);

const initialState = {
  tickets: [],
  copyTickets: [],
  status: null,
  error: null,
  loading: true,
  visible: 5,
};

export const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    loadMore(state, action) {
      state.visible += action.payload;
    },
    filterTickets(state, action) {
      state.copyTickets = [];
      const filter = state.tickets.filter((item) => {
        return (
          (action.payload.has('nonStop') &&
            (item.segments[0].stops.length === 0 || item.segments[1].stops.length === 0)) ||
          (action.payload.has('oneTransplant') &&
            (item.segments[0].stops.length === 1 || item.segments[1].stops.length === 1)) ||
          (action.payload.has('twoTransplant') &&
            (item.segments[0].stops.length === 2 || item.segments[1].stops.length === 2)) ||
          (action.payload.has('threeTransplant') &&
            (item.segments[0].stops.length === 3 || item.segments[1].stops.length === 3))
        );
      });
      state.copyTickets = filter;
    },
    sortTickets(state, action) {
      let sort;
      let minPrice;
      let minDuration;
      switch (action.payload) {
        case 'cheap':
          sort = (a, b) => a.price - b.price;
          break;
        case 'fast':
          sort = (a, b) =>
            a.segments[0].duration + a.segments[1].duration - (b.segments[0].duration + b.segments[1].duration);
          break;
        case 'optimal':
          minPrice = state.copyTickets.reduce((acc, item) => acc + item.price, 0) / state.copyTickets.length;
          minDuration =
            state.copyTickets.reduce((acc, item) => acc + item.segments[0].duration + item.segments[1].duration, 0) /
            state.copyTickets.length;
          sort = (a, b) => {
            const rateA = a.price / minPrice + (a.segments[0].duration + a.segments[1].duration) / minDuration;
            const rateB = b.price / minPrice + (b.segments[0].duration + b.segments[1].duration) / minDuration;
            return rateA - rateB;
          };
          break;
      }
      state.copyTickets = state.copyTickets.sort(sort);
    },
  },
  extraReducers: {
    [fetchTickets.pending]: (state) => {
      state.status = 'loading';
      state.error = null;
    },

    [fetchTickets.fulfilled]: (state, action) => {
      state.tickets = action.payload.tickets;
      state.copyTickets = action.payload.tickets;
      state.status = 'ok';
      state.loading = action.payload.stop;
    },

    [fetchTickets.rejected]: (state) => {
      state.status = 'error';
    },
  },
});

export const { loadMore, copyTickets, filterTickets, sortTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
