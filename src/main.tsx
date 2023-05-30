import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './routers';
import './styles/index.css';
import 'animate.css';

import { Provider } from 'react-redux';
import store from './store/store';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);
