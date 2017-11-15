import axios from 'axios';
export const GET_MIND_MAP = 'get_mindmap';

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

export function getMapDetails(id, callback) {
  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);
    axios.get(`${API_URL}/mindmap`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_MIND_MAP,
          payload: response
        });
        debugger;
        callback(response.data);
      })
  }
}

