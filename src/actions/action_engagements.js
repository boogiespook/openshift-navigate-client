import axios from 'axios';

export const GET_ENGAGEMENTS = 'get_engagements';
export const CREATE_ENGAGEMENT = 'create_engagement';
export const FETCH_RESOURCES_FAIL = 'fetch_resources_fail';

var API_URL = "https://localhost:8001";
//const API_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";const API_URL = "https://localhost:8001";
//const API_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";

function getFromLocalStorage () {
  var config;
  config = localStorage.getItem('initConfig');
  try {
    return JSON.parse(config);
  } catch (e) {
    console.log('Problem parsing initConfig from local storage');
    return null;
  }
  // localStorage.setItem('initConfig', JSON.stringify(data));
}

function getApiUrl (getState) {
  debugger;
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

export function getEngagements() {
  // The callback is useful because we want to navigate the user only after the post comes back

  console.log('calling get Engagements');

  // const request = axios.get(`${API_URL}/engagement`);

  // return {
  //   type: GET_ENGAGEMENTS,
  //   payload: request
  // };

  return function (dispatch, getState) {
    console.log('calling create Engagements action');

    // data = getFromLocalStorage();
    // API_URL = data.initConfig.env.API_URL;
    API_URL = getApiUrl(getState);

    console.log('API_URL:::: ' + API_URL);
    console.log('API_URL:::: ' + API_URL);
    console.log('API_URL:::: ' + API_URL);
    console.log('API_URL:::: ' + API_URL);

    axios.get(`${API_URL}/engagement`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_ENGAGEMENTS,
          payload: response
        });

      })      // Async action failed...
      .catch((err) => {

        // TODO: see here for best practice on error handling
        // https://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-react-redux

        console.log('err:::: ' + JSON.stringify(err));

        // Dispatch specific "some resources failed" if needed...
        dispatch({type: FETCH_RESOURCES_FAIL, error: err});

        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        // dispatch({type: ADD_ERROR, error: err});
      });
  }
}

export function createEngagement(name, callback) {

  return function (dispatch, getState) {
    console.log('calling create Engagements action');

    debugger;
    var data = getState();
    API_URL = data.initConfig.env.API_URL;

    console.log('ROOT URL:::: ' + API_URL);
    console.log('ROOT URL:::: ' + API_URL);
    console.log('ROOT URL:::: ' + API_URL);
    console.log('ROOT URL:::: ' + API_URL);


    let requestPayload = {
      'name': name
    };

    console.log('creating engagement requestPayload: ', requestPayload, {withCredentials: true});
    axios.post(`${API_URL}/engagement`, requestPayload)
      .then((response) => {
        console.log('response !!! ');
        dispatch({
            type: CREATE_ENGAGEMENT,
            payload: response
        });

        callback();
      })      // Async action failed...
      .catch((err) => {

        console.log('err:::: ' + JSON.stringify(err));

        // Dispatch specific "some resources failed" if needed...
        // dispatch({type: FETCH_RESOURCES_FAIL});

        // Dispatch the generic "global errors" action
        // This is what makes its way into state.errors
        // dispatch({type: ADD_ERROR, error: err});
      });
  }
}


// Sample Error response{
// "config": {
//     "headers": {
//         "Accept": "application/json, text/plain, */*"
//     },
//     "maxContentLength": -1,
//     "method": "get",
//     "timeout": 0,
//     "transformRequest": {},
//     "transformResponse": {},
//     "url": "https://127.0.0.1:8001/engagement",
//     "xsrfCookieName": "XSRF-TOKEN",
//     "xsrfHeaderName": "X-XSRF-TOKEN"
// },
// "request": {},
// "response": {
//     "config": {
//         "headers": {
//             "Accept": "application/json, text/plain, */*"
//         },
//         "maxContentLength": -1,
//         "method": "get",
//         "timeout": 0,
//         "transformRequest": {},
//         "transformResponse": {},
//         "url": "https://127.0.0.1:8001/engagement",
//         "xsrfCookieName": "XSRF-TOKEN",
//         "xsrfHeaderName": "X-XSRF-TOKEN"
//     },
//     "data": {},
//     "headers": {
//         "content-type": "application/json; charset=utf-8"
//     },
//     "request": {},
//     "status": 401,
//     "statusText": "Unauthorized"
// }
