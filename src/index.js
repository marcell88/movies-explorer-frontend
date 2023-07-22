import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
document.documentElement.lang = 'ru';
root.render(
  <BrowserRouter><App /></BrowserRouter>
);