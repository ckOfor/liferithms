import { createBrowserHistory } from 'history'
import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import createRootReducer from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const history = createBrowserHistory()

const persistConfig = {
  blacklist: ['form'],
  key: 'reactreduxform',
  storage
};

const middleware = applyMiddleware(thunk);

const persistedReducer = persistReducer(persistConfig, createRootReducer(history));

const store = createStore(
  persistedReducer, // root reducer with router state
  compose(
    composeWithDevTools(
      middleware,
    applyMiddleware(
      routerMiddleware(history), // for dispatching history actions
      // ... other middlewares ...
    )),
  ),
)
const persistor = persistStore(store);

export { store, persistor };
