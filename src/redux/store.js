import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { summonerReducer } from './reducers';
import { watchAddSummoner } from '../sagas/sagas';

const sagaMiddleware = createSagaMiddleware();

// Create a Redux store holding the state of our summoners.
let store = createStore(
  summonerReducer,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(watchAddSummoner);

export default store;
