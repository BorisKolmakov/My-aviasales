import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import * as actions from '../../redux/actions/actionCreators';

import classes from './sideBar.module.scss';

function SideBar() {
  const filter = useSelector((state) => state.filtersReducer);
  const { toggleFilter } = actions;
  const dispatch = useDispatch();

  const handleChange = (value) => {
    dispatch(toggleFilter(value));
  };

  return (
    <div className={classes.filter}>
      <p className={classes.filter__title}>количество пересадок</p>
      <ul className={classes.filter__list}>
        {filter.map((item) => (
          <li className={classes.filter__item} key={item.value}>
            <label className={classes.filter__label}>
              <input
                className={classes.filter__button}
                type="checkbox"
                checked={item.checked}
                onChange={() => handleChange(item.value)}
              />
              <span className={classes.filter__text}>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideBar;
