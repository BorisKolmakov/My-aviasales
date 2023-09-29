import React, { useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { filterTickets, sortTickets } from '../../utilities/utilities';
import { AlertAttention, AlertError } from '../alert-error/alert-error';
import * as actions from '../../redux/actions/actionCreators';
import Ticket from '../Ticket/ticket';
import Spinner from '../Spinner';

import classes from './ticketList.module.scss';

function TicketList() {
  const [counter, setCounter] = useState(5);
  const tabs = useSelector((state) => state.sortTabReducer);
  const filters = useSelector((state) => state.filtersReducer);
  const reducerTickets = useSelector((state) => state.ticketsReducer);
  const dispatch = useDispatch();
  const { sort } = tabs;
  const { tickets, loading, error } = reducerTickets;

  useEffect(() => {
    const { getDataId } = actions;
    dispatch(getDataId());
  }, []);

  const sortFilterTickets = useMemo(() => {
    return filterTickets(filters, sortTickets(tickets, sort));
  }, [filters, sortTickets, tickets, sort]);

  return (
    <div>
      {!loading && !error ? <Spinner /> : null}
      {error ? <AlertError message={error} /> : null}
      <ul className={classes.ticket_list}>
        {sortFilterTickets.slice(0, counter).map((el) => {
          return <Ticket key={`${el.price}${el.carrier}${el.segments[0].date}${el.segments[1].date}`} item={el} />;
        })}
        {!sortFilterTickets.length && !error ? <AlertAttention /> : null}
      </ul>
      {sortFilterTickets.length ? (
        <button onClick={() => setCounter(counter + 5)} className="button">
          показать ещё 5 билетов
        </button>
      ) : null}
    </div>
  );
}

export default TicketList;
