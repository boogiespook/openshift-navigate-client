import axios from 'axios';

export const GET_BUSINESS_GOALS = 'get_business_goals';
export const SET_BUSINESS_GOALS = 'set_business_goals';

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

export function getBusinessGoals(id) {
  // The callback is useful because we want to navigate the user only after the post comes back

  console.log('calling get business goals');

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/businessgoals?engagementId=${id}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_BUSINESS_GOALS,
          payload: response
        });
      })
  }
}

export function setBusinessGoals(engagementId, newGoals) {
  // The callback is useful because we want to navigate the user only after the post comes back
   let requestPayload = {
     engagementId: engagementId,
     goals: newGoals
   };

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.put(`${API_URL}/businessgoals`, requestPayload, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: SET_BUSINESS_GOALS,
          payload: newGoals
        });
      })
  }
}
