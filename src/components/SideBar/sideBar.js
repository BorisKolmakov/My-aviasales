import { useSelector, useDispatch } from 'react-redux';
import propTypes from 'prop-types';

import { setAll, setNonStop, setOneTransplant, setTwoTransplant, setThreeTransplant } from '../../redux/filtersSlice';

import classes from './sideBar.module.scss';

function SideBar() {
  const { all, nonStop, oneTransplant, twoTransplant, threeTransplant } = useSelector((state) => state.root.filters);
  const dispatch = useDispatch();
  const allFilters = nonStop === true && oneTransplant === true && twoTransplant === true && threeTransplant === true;

  return (
    <div className={classes.sidebar_container}>
      <h3 className={classes.sidebar_container__header}>Количество пересадок</h3>
      <>
        <input type="checkbox" id={1} checked={allFilters} onChange={() => dispatch(setAll(all))} />
        <label htmlFor={1} className={classes.sidebar_container__checkbox}>
          Все
        </label>
      </>
      <>
        <input type="checkbox" id={2} checked={nonStop} onChange={() => dispatch(setNonStop(nonStop))} />
        <label htmlFor={2} className={classes.sidebar_container__checkbox}>
          Без пересадок
        </label>
      </>
      <>
        <input
          type="checkbox"
          id={3}
          checked={oneTransplant}
          onChange={() => dispatch(setOneTransplant(oneTransplant))}
        />
        <label htmlFor={3} className={classes.sidebar_container__checkbox}>
          1 пересадка
        </label>
      </>
      <>
        <input
          type="checkbox"
          id={4}
          checked={twoTransplant}
          onChange={() => dispatch(setTwoTransplant(twoTransplant))}
        />
        <label htmlFor={4} className={classes.sidebar_container__checkbox}>
          2 пересадки
        </label>
      </>
      <>
        <input
          type="checkbox"
          id={5}
          checked={threeTransplant}
          onChange={() => dispatch(setThreeTransplant(threeTransplant))}
        />
        <label htmlFor={5} className={classes.sidebar_container__checkbox}>
          3 пересадки
        </label>
      </>
    </div>
  );
}

export default SideBar;

SideBar.propTypes = {
  setAll: propTypes.func,
  setNonStop: propTypes.func,
  setOneTransplant: propTypes.func,
  setTwoTransplant: propTypes.func,
  setThreeTransplant: propTypes.func,
  all: propTypes.string,
  nonStop: propTypes.string,
  oneTransplant: propTypes.string,
  twoTransplant: propTypes.string,
  threeTransplant: propTypes.string,
};

SideBar.defaultProps = {
  setAll: () => {},
  setNonStop: () => {},
  setOneTransplant: () => {},
  setTwoTransplant: () => {},
  setThreeTransplant: () => {},
  all: 'all',
  nonStop: 'nonStop',
  oneTransplant: 'oneTransplant',
  twoTransplant: 'twoTransplant',
  threeTransplant: 'threeTransplant',
};
