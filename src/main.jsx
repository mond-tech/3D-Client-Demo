// src/main.jsx (or src/index.js)
import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM.createRoot for React 18+
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
