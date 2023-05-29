import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Component } from 'react';

import ScrollToTop from '../components/ScrollToTop';
import Favorites from '../pages/Favorites';
import Category from '../pages/Category';
import Detail from '../pages/Detail';
import Error from '../pages/Error';
import Home from '../pages';

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/favorite"
          element={<Favorites />}
        />
        <Route
          path="/category/:movie_category"
          element={<Category />}
        />
        <Route
          path="/detail/:movie_id"
          element={<Detail />}
        />
        <Route
          path="*"
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
