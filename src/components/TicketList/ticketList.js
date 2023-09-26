import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import propTypes from 'prop-types';

import { filterTickets, sortTickets } from '../../redux/ticketsSlice';
import Ticket from '../Ticket/ticket';

import classes from './ticketList.module.scss';

function TicketList() {
  const { status, copyTickets, visible, loading } = useSelector((state) => state.root.tickets);
  const { choiceFilters, ticketsType } = useSelector((state) => state.root.filters);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loading) {
      dispatch(filterTickets(choiceFilters));
      dispatch(sortTickets(ticketsType));
    }
  }, [ticketsType, choiceFilters]);

  const getTicketsList = () => {
    if (status === 'error') return <p>Ошибка сервера, попробуйте еще раз</p>;
    if (status === 'loading') return;
    if (!copyTickets.length) return <p>Рейсов, подходящих под заданные фильтры, не найдено</p>;
    return copyTickets.slice(0, visible).map((item, i) => <Ticket key={i} item={item} />);
  };

  return (
    <>
      <section className={classes.ticketList}>{getTicketsList()}</section>
    </>
  );
}

export default TicketList;

TicketList.propTypes = {
  status: propTypes.string,
  copyTickets: propTypes.array,
  visible: propTypes.number,
  loading: propTypes.bool,
  choiceFilters: propTypes.array,
  ticketsType: propTypes.string,
};

TicketList.defaultProps = {
  status: 'ok',
  copyTickets: [],
  visible: 5,
  loading: false,
  choiceFilters: [],
  ticketsType: 'cheap',
};
