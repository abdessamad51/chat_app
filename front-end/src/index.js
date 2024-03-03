import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
import  './assets/js/template.js';
import  './assets/js/vendor.js';
import  './assets/css/template.dark.bundle.css';
import  './assets/css/template.bundle.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
// import { AuthProvider } from './contexts/AuthContext.js';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* <AuthProvider> */}
    <Provider store={store}>
      <App />
    </Provider>
    {/* </AuthProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
