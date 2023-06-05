import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import HistoryRouter from '../src/components/history-route/history-route';

import App from './components/app/app';
import { store } from './store';
import React from 'react';
import browserHistory from './browser-history';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <HistoryRouter history={browserHistory}>
        <App/>
        <ToastContainer />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
);
