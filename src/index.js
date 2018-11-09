import React from 'react';
import { render } from 'react-dom';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';
import 'semantic-ui-css/semantic.min.css';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import setAuthorisationToken from './utils/setAuthorisationToken';
import Auth from './Container/Authentication/Auth';
import { setCurrentUser } from './actions/authentication';

/* istanbul ignore next not testing redux-store-boiler-plate */
// eslint-disable-next-line no-underscore-dangle, no-undef
const envHasReduxDevToolsExtension = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__);
/* istanbul ignore next not testing redux-store-boiler-plate */
function resolveComposerFunction() {
    return (envHasReduxDevToolsExtension) ?
        // eslint-disable-next-line no-underscore-dangle, no-undef
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ :
        compose;
}

/* istanbul ignore next not testing redux-store-boiler-plate */
const composeEnhancers = resolveComposerFunction();

/* istanbul ignore next not testing redux-store-boiler-plate */
function configureStore(preloadedState) {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeEnhancers(...storeEnhancers);

  const store = createStore(
      reducer,
      preloadedState,
      composedEnhancer,
  );

  return store;
}
/* istanbul ignore next not testing redux-store-boiler-plate */
const store = configureStore({});
const auth = new Auth();

if (auth.getToken()) {
    if (auth.isTokenExpired(auth.getToken())) {
        auth.logout();
        window.location = '/user/login';
    } else {
        setAuthorisationToken(auth.getToken());
        store.dispatch(setCurrentUser(auth.getUser(auth.getToken())));
    }
}


render(
  <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
