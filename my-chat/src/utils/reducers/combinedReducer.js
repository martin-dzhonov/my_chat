import loggedReducer from './isLogged';
import sidebarReducer from './sidebarVisibility';
import {combineReducers} from 'redux';

const combinedReducer = combineReducers({
    isLogged: loggedReducer,
    sidebarVisible: sidebarReducer
})

export default combinedReducer;