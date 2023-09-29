import { combineReducers } from 'redux';

import { filtersReducer } from './filtersReducer';
import { sortTabReducer } from './sortTabReducer';
import { ticketsReducer } from './ticketsReducer';

const rootReducer = combineReducers({
  filtersReducer,
  sortTabReducer,
  ticketsReducer,
});

export default rootReducer;
