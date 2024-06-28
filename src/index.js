import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/App';
//import 'bootstrap/dist/css/bootstrap.min.css';
import jquery from 'jquery';
window.$ = window.jQuery = jquery;
require('jquery-slimscroll');


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <App/>
);
