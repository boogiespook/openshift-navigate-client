import axios from 'axios';
export const LOGIN = 'login';
export const IS_AUTHENTICATED = 'is_authenticated';
export const FETCH_RESOURCES_FAIL = 'fetch_resources_fail';
export const INIT_LOGIN = 'init_login';

function getFromLocalStorage () {
  var config;
  config = localStorage.getItem('initConfig');
  try {
    return JSON.parse(config);
  } catch (e) {
    console.log('Problem parsing initConfig from local storage');
    return null;
  }
}

function getApiUrl (getState) {
  var data = getState();
  var initConfig;
  if (data) {
    initConfig = data.initConfig;
  }
  if (!data || !initConfig || !initConfig.env) {
    initConfig = getFromLocalStorage();
  }
  return initConfig.env.API_URL;
}

export function login(credentials) {
  console.log('making call to server');
  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);
    axios.get(`${API_URL}/auth/login`)
      .then((response) => {
        dispatch({
          type: LOGIN,
          payload: response
        });
      })
  }
}

export function initLogin(credentials) {
  console.log('making call to server');
  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    window.location = API_URL + '/auth/login';

    dispatch({
      type: INIT_LOGIN,
      payload: null
    });
  }
}

export function isAuthenticated(callback) {
  console.log('making call to server, isAuthenticated');
  // The callback is useful because we want to navigate the user only after the post comes back

  return function (dispatch, getState) {
    console.log('calling isAuthenticated action');
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/auth/isauthenticated`, {withCredentials: true})
      .then((response) => {
        console.log('back from isauthenticated');
        // dispatch({
        //     type: IS_AUTHENTICATED,
        //     payload: response
        // });
        callback(true);
      })      // Async action failed...
      .catch((err) => {

        // TODO: see here for best practice on error handling
        // https://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-react-redux

        console.log('err:::: ' + JSON.stringify(err));

        // Dispatch specific "some resources failed" if needed...
        // dispatch({type: FETCH_RESOURCES_FAIL, error: err});
        callback(false);
        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        // dispatch({type: ADD_ERROR, error: err});
      });
  }
}
