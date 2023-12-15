import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/style.scss';
import App from './App';

import { store } from './reducer/store.js';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    {/* 세션 역할 store에 저장 */}
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
