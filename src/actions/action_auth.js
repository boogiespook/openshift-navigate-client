import axios from 'axios';
export const LOGIN = 'login';
export const IS_AUTHENTICATED = 'is_authenticated';
export const FETCH_RESOURCES_FAIL = 'fetch_resources_fail';

//const ROOT_URL = "https://localhost:8001";
const ROOT_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";//const ROOT_URL = "https://localhost:8001";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


// export function login(credentials, callback) {
  // The callback is useful because we want to navigate the user only after the post comes back
  // const request = axios.post(`${ROOT_URL}/auth/login`, credentials)
  //   .then(() => callback());

  // return {
  //   type: LOGIN,
  //   payload: request
  // };

export function login(credentials) {
  console.log('making call to server');
  // The callback is useful because we want to navigate the user only after the post comes back
  const request = axios.get(`${ROOT_URL}/auth/login`);

  return {
    type: LOGIN,
    payload: request
  };
}

export function isAuthenticated(callback) {
  console.log('making call to server, isAuthenticated');
  // The callback is useful because we want to navigate the user only after the post comes back

  return function (dispatch) {
    console.log('calling isAuthenticated action');

    axios.get(`${ROOT_URL}/auth/isauthenticated`, {withCredentials: true})
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
