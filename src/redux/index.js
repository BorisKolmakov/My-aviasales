import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { enableMapSet } from 'immer';

import filtersReducer from './filtersSlice';
import ticketsReducer from './ticketsSlice';

enableMapSet();

const rootReducer = combineReducers({
  filters: filtersReducer,
  tickets: ticketsReducer,
});

export const store = configureStore({
  reducer: { root: rootReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
