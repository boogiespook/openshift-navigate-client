import axios from 'axios';

export const GET_INIT_CONFIG = 'get_init_config';

// This is the node.js server that is serving the static files.
// Not the remote API. If node if not serving the files we can assume
// that we are running locally.

function saveToLocalStorage (data) {
  localStorage.setItem('initConfig', JSON.stringify(data));
}

export function getInitConfig() {

  var defaultLocalConfig = {
    'env' : {
      'API_URL': 'https://localhost:8001'
    }
  }

  return function (dispatch) {
    console.log('calling get init');

    // local path ok, will go back to same server
    axios.get(`/init`)
      .then((response) => {

        debugger;

        saveToLocalStorage(response.data);

        dispatch({
          type: GET_INIT_CONFIG,
          payload: response
        });

      })      // Async action failed...
      .catch((err) => {

        // TODO: see here for best practice on error handling
        // https://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-react-redux

        console.log('Error retrieving init config');

        debugger;
        saveToLocalStorage(defaultLocalConfig);

        dispatch({
          type: GET_INIT_CONFIG,
          payload: defaultLocalConfig
        });
      });
  }

}
