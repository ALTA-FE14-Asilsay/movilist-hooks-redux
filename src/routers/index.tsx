import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import ScrollToTop from '../components/ScrollToTop';
import { ThemeState } from '../reducer/themeSlice';
import Favorites from '../pages/Favorites';
import Category from '../pages/Category';
import Detail from '../pages/Detail';
import Error from '../pages/Error';
import Home from '../pages';

export const Router = () => {
  const themeSelect = useSelector(
    (state: { theme: ThemeState }) => state.theme
  );

  const theme = localStorage.getItem('theme') || 'bumblebee';

  useEffect(() => {
    if (theme === 'bumblebee')
      document.documentElement.setAttribute('data-theme', 'bumblebee');
    else if (theme === 'luxury')
      document.documentElement.setAttribute('data-theme', 'luxury');
  }, [themeSelect.DarkMode]);

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
