import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { store } from '../src/redux/store';
import { history } from '../src/redux/store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import { ConnectedRouter } from 'connected-react-router'

const Root = () => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();
