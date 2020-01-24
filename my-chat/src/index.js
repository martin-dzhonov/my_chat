import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  {createStore, applyMiddleware } from 'redux';
import combinedReducer from './utils/reducers/combinedReducer';
import { Provider } from 'react-redux';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { PersistGate } from 'redux-persist/integration/react'

const config = {}
const middlewares = [
  createStateSyncMiddleware(config),
]
const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducer)

const store = createStore(persistedReducer, {}, applyMiddleware(...middlewares));
let persistor = persistStore(store);
initStateWithPrevTab(store);

ReactDOM.render(<Provider store={store}> <PersistGate loading={null} persistor={persistor}><App /></PersistGate></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
