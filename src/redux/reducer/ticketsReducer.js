import { FETCH_TICKETS_REQUEST, FETCH_TICKETS_SUCCESS, FETCH_TICKETS_FAILURE, VIEW_MORE } from '../actions/actionTypes';
import { initStateTickets } from '../init-state';

export const ticketsReducer = (state = initStateTickets, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        loading: false,
        tickets: [...state.tickets, ...action.payload],
      };
    case FETCH_TICKETS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case VIEW_MORE:
      return { ...state, counter: state.counter + 5 };
    default:
      return state;
  }
};
