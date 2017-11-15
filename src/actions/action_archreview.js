import axios from 'axios';
export const GET_ARCH_REVIEW = 'get_archreview';
export const UPDATE_ARCH_REVIEW = 'update_archreview';

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

export function getArchReview(id) {
  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.get(`${API_URL}/archquestions?engagementId=${id}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_ARCH_REVIEW,
          payload: response
        });
      })
  }
}

export function saveReview(id, values, category, callback) {
  // The callback is useful because we want to navigate the user only after the post comes back

  let payload = {
    engagementId: id,
    category: category,
    answers: values
  }

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);

    axios.put(`${API_URL}/archquestions`, payload, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: UPDATE_ARCH_REVIEW,
          payload: response
        });
        callback();
      })
  }
}



