import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n/i18n';
import './assets/sass/main.scss';
ReactDOM.render(
  <Suspense fallback={<p>Loading</p>}>
    <App />
  </Suspense>,
  document.getElementById('gulfWorkers'),
);
reportWebVitals();
