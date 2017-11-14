import axios from 'axios';

export const GET_INIT_CONFIG = 'get_init_config';

// This is the node.js server that is serving the static files.
// Not the remote API. If node if not serving the files we can assume
// that we are running locally.
const ROOT_URL = "http://localhost:3000";



export function getInitConfig() {

  // console.log('calling get init config');

  // return function (dispatch, getState) {
  //   console.log('calling get state');
  //   debugger;
  //   var data = getState();

  // }

  var defaultLocalConfig = {
    'data' : {
      'env' : {
        'API_URL': 'https://localhost:8001'
      }
    }
  }


  // const request = axios.get(`${ROOT_URL}/engagement`);

  // return {
  //   type: GET_ENGAGEMENTS,
  //   payload: request
  // };

  return function (dispatch) {
    console.log('calling get init');

    axios.get(`${ROOT_URL}/init`)
      .then((response) => {
        dispatch({
          type: GET_INIT_CONFIG,
          payload: response
        });

      })      // Async action failed...
      .catch((err) => {

        // TODO: see here for best practice on error handling
        // https://stackoverflow.com/questions/34403269/what-is-the-best-way-to-deal-with-a-fetch-error-in-react-redux

        console.log('Error retrieving init config');

        dispatch({
          type: GET_INIT_CONFIG,
          payload: defaultLocalConfig
        });
      });
  }



}
