import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import favoritesReducer from './reducers/favoritesReducer';

const rootReducer = combineReducers({
  favorites: favoritesReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;            