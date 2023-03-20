import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

import Header from '../components/Header';
import { resetDeleteArticle } from '../createSlice/creatAndEditArticleSlice';

import classes from './MainLayout.module.scss';

function MainLayout() {
  const deleteArticle = useSelector((state) => state.creatAndEditReducer.deleteArticle);
  const dispatch = useDispatch();

  useEffect(() => {
    if (deleteArticle) {
      toast.success('Your article has been successfully deleted', {
        position: 'top-center',
        theme: 'colored',
        autoClose: 3000,
      });
      dispatch(resetDeleteArticle());
    }
  }, [deleteArticle]);

  return (
    <>
      <ToastContainer />
      <header className={classes['main-layout__header']}>
        <Header />
      </header>
      <main className={classes['main-layout__main']}>
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
