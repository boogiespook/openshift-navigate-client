import axios from 'axios';
export const GET_BUSINESS_REVIEW = 'get_business_review';
export const UPDATE_BUSINESS_REVIEW = 'update_business_review';

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

export function getReview(id) {
  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);
    axios.get(`${API_URL}/businessreview?engagementId=${id}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_BUSINESS_REVIEW,
          payload: response
        });
      })
  }
}

export function saveReview(id, values, category, callback) {
  let payload = {
    engagementId: id,
    category: category,
    answers: values
  }

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);
    axios.put(`${API_URL}/businessreview`, payload, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: UPDATE_BUSINESS_REVIEW,
          payload: response
        });
      })
  }
}
