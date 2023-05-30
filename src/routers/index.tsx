import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DarkThemeContext from '../context/darkModeContext';
import { useEffect, useState } from 'react';

import ScrollToTop from '../components/ScrollToTop';
import Favorites from '../pages/Favorites';
import Category from '../pages/Category';
import Detail from '../pages/Detail';
import Error from '../pages/Error';
import Home from '../pages';

export const Router = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'bumblebee'
  );

  const changeCurrentTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    if (theme === 'bumblebee')
      document.documentElement.setAttribute('data-theme', 'bumblebee');
    else if (theme === 'luxury')
      document.documentElement.setAttribute('data-theme', 'luxury');
  }, [theme]);

  return (
    <DarkThemeContext.Provider
      value={{ currentTheme: theme, changeCurrentTheme }}
    >
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
    </DarkThemeContext.Provider>
  );
};

export default Router;
