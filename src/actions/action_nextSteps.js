import axios from 'axios';

export const GET_NEXT_STEPS = 'get_NEXT_STEPS';
export const CREATE_NEXT_STEPS = 'create_NEXT_STEPS';

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

export function getNextSteps(id) {
  console.log('Calling get nextsteps');

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/nextsteps?engagementId=${id}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_NEXT_STEPS,
          payload: response
        });
      })
  }
}

export function createNextSteps(payload) {

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.post(`${API_URL}/nextsteps`, payload, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: CREATE_NEXT_STEPS,
          payload: response
        });
      })
  }
}