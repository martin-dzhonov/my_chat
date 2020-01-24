import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import  {createStore, applyMiddleware } from 'redux';
import combinedReducer from './utils/reducers/combinedReducer';
import { Provider } from 'react-redux';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync'

const config = {}
const middlewares = [
  createStateSyncMiddleware(config),
]

const store = createStore(combinedReducer, {}, applyMiddleware(...middlewares))
initStateWithPrevTab(store)

//let store = createStore(combinedReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
