/**
 * Created by jkenny on 01/09/2017.
 * An Action Creator to asychronously fetch available User Stories associated to a single Workshop from the Cloud.
 */
import axios from 'axios';
export const GET_USERSTORIES = 'get_userstories';

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

export function getUserStories(engagementId, workshopName, callback) {
  console.log("Action getUserStories: ", engagementId);

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/userstory?engagementId=${engagementId}&workshopName=${workshopName}`, {withCredentials: true})
      .then(response => {
        console.log("getUserStories get response: ", response);
        callback(response);

        dispatch({
            type: GET_USERSTORIES,
            payload: response
        });
      })
      .catch((error) => {
          console.log(error);
      })
  }
}
