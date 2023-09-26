import logo from '../../img/Logo.svg';

import classes from './header.module.scss';

function Header() {
  return (
    <>
      <header className={classes.header}>
        <img src={logo} alt="aviasales" className={classes.header__logo} />
      </header>
    </>
  );
}

export default Header;
