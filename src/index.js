import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketManager } from './service/socketManager';
import store from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <SocketManager>
      <App />
      </SocketManager>
    </React.StrictMode>
  </Provider>
);


    