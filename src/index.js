import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/index.css';
import App from './App';
import store from './redux/store';
import { Provider } from 'react-redux';
import { StoreProvider } from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
