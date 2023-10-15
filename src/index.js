import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './redux/store';
import './index.css';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <React.StrictMode>
    <BrowserRouter basename="/cars_for_rent">
      <App />
    </BrowserRouter>
  </React.StrictMode>
    </Provider>
);