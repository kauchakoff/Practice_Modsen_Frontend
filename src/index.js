import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './components/App/App';
import 'bootstrap/dist/css/bootstrap.min.css';


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App/>    
  </React.StrictMode>
);
