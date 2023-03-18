import { Outlet } from 'react-router-dom';
import cn from 'classnames';
import { useSelector } from 'react-redux';

import classes from '../components/App/App.module.scss';
import Header from '../components/Header';

function MainLayout() {
  const loadingArticle = useSelector((state) => state.articleReducer.loading);
  const loadingUser = useSelector((state) => state.userReducer.loading);
  const appHeader = cn(classes.app__header, {
    [classes.app__aaa]: loadingArticle || loadingUser,
  });

  return (
    <>
      <header className={appHeader}>
        <Header />
      </header>
      <main className={classes.app__main}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
