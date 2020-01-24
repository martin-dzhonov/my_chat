import loggedReducer from './isLogged';
import sidebarReducer from './sidebarVisibility';
import {combineReducers} from 'redux';
import { withReduxStateSync } from 'redux-state-sync'

const combinedReducer = combineReducers({
    isLogged: loggedReducer,
    sidebarVisible: sidebarReducer
})

export default withReduxStateSync(combinedReducer);