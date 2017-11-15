/**
 * Created by jkenny on 31/08/2017.
 * An Action Creator to asychronously fetch available Workshops from the Cloud. A single
 * workshop is associated to many User stories.
 */
import axios from 'axios';
export const GET_WORKSHOPS = 'get_workshops';
export const UPDATE_WORKSHOP = 'update_workshop';

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

export function getWorkShops(id) {
  console.log('getWorkShops for engagement Id: ', id);

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/workshops?engagementId=${id}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_WORKSHOPS,
          payload: response
        });
      })
  }
}

export function updateWorkshop(updatedWorkshop, callback) {
  // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
  // is fullfilled, it is passed to all the reducers as regular object.
  console.log("updateWorkshop requestPayload: ", updatedWorkshop);


  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.put(`${API_URL}/workshops`, updatedWorkshop, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: UPDATE_WORKSHOP,
          payload: response
        });
        callback(response);
      })
  }
}