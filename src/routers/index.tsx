import { Component } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Detail from '../pages/Detail';
import Favorites from '../pages/Favorites';
import Home from '../pages';
import Error from '../pages/Error';
import ScrollToTop from '../components/ScrollToTop';

class Router extends Component {
  render() {
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
  }
}

export default Router;
