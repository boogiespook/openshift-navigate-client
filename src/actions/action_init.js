import axios from 'axios';

export const GET_INIT_CONFIG = 'get_init_config';

const ROOT_URL = "https://localhost:8001";
//const ROOT_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";const ROOT_URL = "https://localhost:8001";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getInitConfig() {

  // console.log('calling get init config');

  // return function (dispatch, getState) {
  //   console.log('calling get state');
  //   debugger;
  //   var data = getState();

  // }


  // The callback is useful because we want to navigate the user only after the post comes back

  console.log('calling get Engagements');

  // const request = axios.get(`${ROOT_URL}/engagement`);

  // return {
  //   type: GET_ENGAGEMENTS,
  //   payload: request
  // };

  return function (dispatch) {
    console.log('calling create Engagements action');

    axios.get(`${ROOT_URL}/engagement`, {withCredentials: true})
      .then((response) => {
        dispatch({
          type: GET_INIT_CONFIG,
          payload: response
        });

      })      // Async action failed...
      .catch((err) => {

      });
  }



}
