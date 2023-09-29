import { getSearchId } from '../../service/getSearchId';
import { getTickets } from '../../service/getTickets';

import {
  ON_SORT_CHEAP,
  ON_SORT_FAST,
  ON_SORT_OPTIMAL,
  TOGGLE_FILTER,
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
  VIEW_MORE,
} from './actionTypes';

export const cheap = () => ({ type: ON_SORT_CHEAP });
export const fast = () => ({ type: ON_SORT_FAST });
export const optimal = () => ({ type: ON_SORT_OPTIMAL });

export const toggleFilter = (value) => ({
  type: TOGGLE_FILTER,
  payload: { value },
});

export const fetchTicketsRequest = () => ({ type: FETCH_TICKETS_REQUEST });
export const fetchTicketsSuccess = (tickets) => ({
  type: FETCH_TICKETS_SUCCESS,
  payload: tickets,
});
export const fetchTicketsFailure = (error) => ({
  type: FETCH_TICKETS_FAILURE,
  payload: error,
});

export const viewMore = () => ({ type: VIEW_MORE });

const getData = async (id, dispatch) => {
  try {
    const response = await getTickets(id);
    const { tickets, stop } = response;
    if (stop) return dispatch(fetchTicketsRequest());
    else if (tickets.length) {
      dispatch(fetchTicketsSuccess(tickets));
      getData(id, dispatch);
    }
  } catch (e) {
    if (e.message === 'Status code 500') {
      console.error(e.message);
      getData(id, dispatch);
    } else {
      dispatch(fetchTicketsFailure(e.message));
    }
  }
};

export const getDataId = () => {
  return async (dispatch) => {
    const id = await getSearchId();
    await getData(id, dispatch);
  };
};
