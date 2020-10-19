import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './components/reducer';
import App from './App';

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/">
        <App />
      </Route>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
