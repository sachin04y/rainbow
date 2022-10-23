import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SocketManager } from './service/socketManager';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketManager>
      <App />
    </SocketManager>
  </React.StrictMode>
);