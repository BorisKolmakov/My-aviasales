import { initStateSort } from '../init-state';
import { DEFAULT_NULL, ON_SORT_CHEAP, ON_SORT_FAST, ON_SORT_OPTIMAL } from '../actions/actionTypes';

export const sortTabReducer = (state = initStateSort, action) => {
  switch (action.type) {
    case ON_SORT_CHEAP:
      return { ...state, sort: 'cheap' };
    case ON_SORT_FAST:
      return { ...state, sort: 'fast' };
    case ON_SORT_OPTIMAL:
      return { ...state, sort: 'optimal' };
    case DEFAULT_NULL:
      return { ...state, sort: 'null' };
    default:
      return state;
  }
};
