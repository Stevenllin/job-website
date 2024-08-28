import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const reduxSagaMiddleware = createSagaMiddleware();
const appReduxMiddlewares = applyMiddleware(reduxSagaMiddleware);

let rootMiddleware;
rootMiddleware = appReduxMiddlewares;
// @ts-ignore
const store = createStore(rootReducer, rootMiddleware);

reduxSagaMiddleware.run(rootSaga);

export default store;