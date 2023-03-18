import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOut } from '../../createSlice/userSlice';
import img from '../../img/avatar.png';

import classes from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();
  const authorized = useSelector((state) => state.userReducer.authorized);
  const userProfile = useSelector((state) => state.userReducer.userProfile);

  const onLogOut = () => {
    dispatch(logOut());
    localStorage.removeItem('userToken');
  };

  const visibleAuthorizedUser = authorized ? (
    <div className={classes.header__autorised}>
      <Link to="/new-article">
        <button type="button" className={`${classes.header__button} ${classes['header__button--create']}`}>
          Create article
        </button>
      </Link>
      <Link to="profile" className={classes.header__link}>
        <div className={classes.header__user}>
          <div className={classes.header__username}>{userProfile.username}</div>
          <img src={userProfile?.image || img} alt="avatar" width={46} height={46} />
        </div>
      </Link>
      <button type="button" className={classes.header__button} onClick={() => onLogOut()}>
        Log Out
      </button>
    </div>
  ) : null;

  const visibleNonAutorizedUser = !authorized ? (
    <div className={classes['header__button-wrapper']}>
      <Link to="/sign-in" className={classes.header__link}>
        Sign In
      </Link>
      <Link to="sign-up">
        <button type="button" className={`${classes.header__button} ${classes['header__button--sign-up']}`}>
          Sign Up
        </button>
      </Link>
    </div>
  ) : null;
  return (
    <div className={classes.header}>
      <Link to="/">
        <div className={classes.header__logo}>Realworld Blog</div>
      </Link>
      {visibleAuthorizedUser}
      {visibleNonAutorizedUser}
    </div>
  );
}

export default Header;
