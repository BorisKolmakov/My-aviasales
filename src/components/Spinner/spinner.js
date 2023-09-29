import PropagateLoader from 'react-spinners/PropagateLoader';

import classes from './spinner.module.scss';

function Spinner() {
  return (
    <div className={classes.spinner}>
      <PropagateLoader color="#2196f3" />
    </div>
  );
}

export default Spinner;
