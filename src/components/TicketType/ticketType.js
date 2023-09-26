import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';

import { setTicketType } from '../../redux/filtersSlice';

import classes from './ticketType.module.scss';

function TicketType() {
  const { cheap, fast, optimal } = useSelector((state) => state.root.filters.types);
  const { ticketsType } = useSelector((state) => state.root.filters);
  const dispatch = useDispatch();

  return (
    <div className={classes.ticketTypes}>
      <input
        type="radio"
        name="radio"
        className={classes.ticketTypes__radio}
        id="cheap"
        onChange={() => dispatch(setTicketType(cheap))}
        checked={ticketsType === cheap}
      />
      <label htmlFor="cheap" className={classes.ticketTypes__label}>
        Самый дешевый
      </label>
      <input
        type="radio"
        name="radio"
        className={classes.ticketTypes__radio}
        id="fast"
        onChange={() => dispatch(setTicketType(fast))}
        checked={ticketsType === fast}
      />
      <label htmlFor="fast" className={[classes.ticketTypes__label, classes.bordered].join(' ')}>
        Самый быстрый
      </label>
      <input
        type="radio"
        name="radio"
        className={classes.ticketTypes__radio}
        id="optimal"
        onChange={() => dispatch(setTicketType(optimal))}
        checked={ticketsType === optimal}
      />
      <label htmlFor="optimal" className={classes.ticketTypes__label}>
        Оптимальный
      </label>
    </div>
  );
}

export default TicketType;

TicketType.propTypes = {
  cheap: propTypes.string,
  fast: propTypes.string,
  optimal: propTypes.string,
  ticketsType: propTypes.string,
};

TicketType.defaultProps = {
  cheap: 'cheap',
  fast: 'fast',
  optimal: 'optimal',
  ticketsType: '',
};
