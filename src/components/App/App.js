import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import ScrollToTop from '../../ScrollToTop';
import ListArticles from '../ListArticles';
import SinglePageArticle from '../SinglePageArticle';
import SignUp from '../SignUp';
import SignIn from '../SignIn';
import { fetchGetCurrentUser } from '../../createSlice/userSlice';
import Profile from '../Profile';
import NewArticle from '../NewArticle';
import PrivateRoute from '../hoc/PrivateRoute';
import EditArticle from '../EditArticle';

import classes from './App.module.scss';

function App() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem('userToken');

  useEffect(() => {
    if (userId) {
      dispatch(fetchGetCurrentUser(userId));
    }
  }, [userId]);

  return (
    <BrowserRouter>
      <ScrollToTop>
        <div className={classes.app}>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<ListArticles />} />
              <Route path="articles" element={<ListArticles />} />
              <Route path="articles/:slug" element={<SinglePageArticle />} />
              <Route
                path="articles/:slug/edit"
                element={
                  <PrivateRoute>
                    <EditArticle />
                  </PrivateRoute>
                }
              />
              <Route path="sign-up" element={<SignUp />} />
              <Route path="sign-in" element={<SignIn />} />
              <Route
                path="profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="new-article"
                element={
                  <PrivateRoute>
                    <NewArticle />
                  </PrivateRoute>
                }
              />
            </Route>
          </Routes>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
