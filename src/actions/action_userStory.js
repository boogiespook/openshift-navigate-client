/**
 * Created by jkenny on 01/09/2017.
 * An Action Creator to manage User Story create, update and delete.
 */
import axios from 'axios';
export const UPDATE_USER_STORY = "update_user_story";
export const DELETE_USER_STORY = "delete_user_story";

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

export function updateUserStory(values, callback) {
  // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
  // is fullfilled, it is passed to all the reducers as regular object.
  console.log("updateUserStory values: ", values);

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.put(`${API_URL}/userstory`, values, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: UPDATE_USER_STORY,
          payload: response
        });
        callback(response);
      })
  }
}

export function deleteUserStory(guid, callback) {

  console.log("deleteUserStory values: ", guid);

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
    // is fullfilled, it is passed to all the reducers as regular object.

    axios.delete(`${API_URL}/userstory/?storyId=${guid}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: DELETE_USER_STORY,
          payload: response
        });
        callback(response);
      })
  }
}