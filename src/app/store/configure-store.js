import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootReducer from './reducers';
import rootSaga from './sagas';

export default (history, initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware();

  let middleware = [
    routerMiddleware(history),
    sagaMiddleware,
  ];

  if (process.env.NODE_ENV !== 'production') {
    middleware = [...middleware, logger];
  }

  // eslint-disable-next-line no-mixed-operators
  const composeEnhancers = process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        ...middleware,
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
