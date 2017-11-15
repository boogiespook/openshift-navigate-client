import axios from 'axios';

export const GET_RTI = 'get_rti';
export const CREATE_RTI = 'create_rti';


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
  return ((initConfig && initConfig.env && initConfig.env.API_URL) || null);
}

export function getRti(engagementId) {

  // The callback is useful because we want to navigate the user only after the post comes back
  console.log('Calling get RTI');

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/rti`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_RTI,
          payload: response
        });
      })
  }
}

export function createRti(engagementId, rtiCode, callback) {

  return function (dispatch, getState) {
    console.log('calling create rti action with code: ' + rtiCode);
    var API_URL = getApiUrl(getState);

    let requestPayload = {
      'rtiCode': rtiCode,
      'engagementId': engagementId
    };

    console.log('creating rti requestPayload: ', requestPayload);
    axios.post(`${API_URL}/rti`, requestPayload, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: CREATE_RTI,
          payload: response
        });
        callback();
      });
  }
}
