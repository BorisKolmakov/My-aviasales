import { format } from 'date-fns';
import propTypes from 'prop-types';

import classes from './ticket.module.scss';

function Ticket({ item }) {
  const numberWithSpaces = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  const declination = (number, words) =>
    words[number % 100 > 4 && number % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][number % 10 < 5 ? Math.abs(number) % 10 : 5]];

  const timeFormatDuration = (x) => {
    let hours = Math.floor(Number(x) / 60);
    let minutes = Number(x) - hours * 60;
    const result = `${hours}ч ${minutes}м`;
    return result;
  };

  const dateDeparture = new Date(item.segments[0].date);
  const dateDeparture2 = new Date(item.segments[1].date);

  const dateArrival = new Date(item.segments[0].date).setMinutes(
    dateDeparture.getMinutes() + item.segments[0].duration
  );
  const dateArrival2 = new Date(item.segments[1].date).setMinutes(
    dateDeparture.getMinutes() + item.segments[1].duration
  );

  return (
    <article className={classes.ticket}>
      <header className={classes.ticket__header}>
        <span className={classes.ticket__price}>{numberWithSpaces(item.price)} Р</span>
        <img src={`https://pics.avs.io/99/36/${item.carrier}.png`} alt="airline logo" className={classes.ticket__img} />
      </header>
      <div className={classes.ticket__content}>
        <div className={classes.trip}>
          <div className={classes.trip__item}>
            <p className={classes.trip__header}>
              {item.segments[0].origin} - {item.segments[0].destination}
            </p>
            <p className={classes.trip__content}>
              {`${format(dateDeparture, 'HH:mm')}`} - {`${format(dateArrival, 'HH:mm')}`}
            </p>
          </div>
          <div className={classes.trip__item}>
            <p className={classes.trip__header}>в пути</p>
            <p className={classes.trip__content}>{timeFormatDuration(item.segments[0].duration)}</p>
          </div>
          <div className={classes.trip__item}>
            <p className={classes.trip__header}>{`${
              item.segments[0].stops.length > 0 ? item.segments[0].stops.length : 'Без'
            } ${declination(item.segments[0].stops.length, ['пересадка', 'пересадки', 'пересадок'])}`}</p>
            <p className={classes.trip__content}>{item.segments[0].stops.join(', ')}</p>
          </div>
        </div>
      </div>
      <div className={classes.ticket__content}>
        <div className={classes.trip}>
          <div className={classes.trip__item}>
            <p className={classes.trip__header}>
              {item.segments[1].origin} - {item.segments[1].destination}
            </p>
            <p className={classes.trip__content}>
              {`${format(dateDeparture2, 'HH:mm')}`} - {`${format(dateArrival2, 'HH:mm')}`}
            </p>
          </div>
          <div className={classes.trip__item}>
            <p className={classes.trip__header}>в пути</p>
            <p className={classes.trip__content}>{timeFormatDuration(item.segments[1].duration)}</p>
          </div>
          <div className={classes.trip__item}>
            <p className={classes.trip__header}>{`${
              item.segments[1].stops.length > 0 ? item.segments[1].stops.length : 'Без'
            } ${declination(item.segments[1].stops.length, ['пересадка', 'пересадки', 'пересадок'])}`}</p>
            <p className={classes.trip__content}>{item.segments[1].stops.join(', ')}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
export default Ticket;

Ticket.propTypes = {
  item: propTypes.object,
};

Ticket.defaultProps = {
  item: {},
};
