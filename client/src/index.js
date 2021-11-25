import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Canvas from './components/Canvas';
import Profile from './views/Profile'
import store from './app/store'
import { Provider } from 'react-redux'
import Login from './views/Login';

ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="profile" element={<Profile />}/>
        <Route path="pictionary" element={<Canvas />}/>
        <Route path="login" element={<Login />}/>
      </Routes>
    </BrowserRouter>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

