import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../redux/actions/actionCreators';

import classes from './ticketType.module.scss';

function TicketType() {
  const { cheap, fast, optimal } = actions;
  const active = useSelector((state) => state.sortTabReducer.sort);
  const dispatch = useDispatch();

  return (
    <div className={classes.tabs}>
      <button
        onClick={() => dispatch(cheap())}
        className={`${classes.tabs__tab_cheap} ${active === 'cheap' ? classes.tabs__tab_cheap_active : ''}`}
      >
        Самый дешевый
      </button>
      <button
        onClick={() => dispatch(fast())}
        className={`${classes.tabs__tab_fast} ${active === 'fast' ? classes.tabs__tab_fast_active : ''}`}
      >
        Самый быстрый
      </button>
      <button
        onClick={() => dispatch(optimal())}
        className={`${classes.tabs__tab_optimal} ${active === 'optimal' ? classes.tabs__tab_optimal_active : ''}`}
      >
        Оптимальный
      </button>
    </div>
  );
}

export default TicketType;
