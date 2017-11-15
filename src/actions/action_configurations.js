/**
 * Created by jkenny on 04/09/2017.
 * An Action Creator to asychronously fetch Openshift Navigate configuration data from the Cloud. Configuration
 * data is used to populate drop downs and apply default values etc
 */
import axios from 'axios';
export const GET_CONFIGURATION = 'get_configuration';

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

export function getConfigurationData(id) {
  console.log('getConfigurationData for configId Id: ', id);

  return function (dispatch, getState) {
    var API_URL = getApiUrl(getState);
    axios.get(`${API_URL}/engagementconfig?configId=${id}`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_CONFIGURATION,
          payload: response
        });
      })

  }
}