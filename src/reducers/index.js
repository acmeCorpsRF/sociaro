import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import citiesReducer from './citiesReducer'

export default (history) => combineReducers({
    citiesReducer,
    router: connectRouter(history)
});