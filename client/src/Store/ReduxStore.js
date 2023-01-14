import {applyMiddleware, compose, createStore} from 'redux';
import ReduxThunk from 'redux-thunk';
  import { reducers } from "../reducers/index";
  
  function saveToLocalStorage(store) {
    try {
        const serializedStore = JSON.stringify(store);
        window.localStorage.setItem('store', serializedStore);
    } catch(e) {
        console.log(e);
    }
  }
  
  function loadFromLocalStorage() {
    try {
        const serializedStore = window.localStorage.getItem('store');
        if(serializedStore === null) return undefined;
        return JSON.parse(serializedStore);
    } catch(e) {
        console.log(e);
        return undefined;
    }
  }
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const persistedState = loadFromLocalStorage();
  
  const store = createStore(reducers, persistedState, composeEnhancers(applyMiddleware(ReduxThunk)));
  
  store.subscribe(() => saveToLocalStorage(store.getState()));
  
  export default store;