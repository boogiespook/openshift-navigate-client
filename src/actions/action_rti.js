import axios from 'axios';

export const GET_RTI = 'get_rti';
export const CREATE_RTI = 'create_rti';

//const ROOT_URL = "https://localhost:8001";
const ROOT_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";//const ROOT_URL = "https://localhost:8001";

const ROOT_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";


//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getRti(engagementId) {

  // The callback is useful because we want to navigate the user only after the post comes back
  console.log('Calling get RTI');

  const request = axios.get(`${ROOT_URL}/rti`, {withCredentials: true});

  return {
    type: GET_RTI,
    payload: request
  };
}

export function createRti(engagementId, rtiCode, callback) {

  return function (dispatch) {
    console.log('calling create rti action with code: ' + rtiCode);

    let requestPayload = {
      'rtiCode': rtiCode,
      'engagementId': engagementId
    };

    console.log('creating rti requestPayload: ', requestPayload, {withCredentials: true});
    axios.post(`${ROOT_URL}/rti`, requestPayload)
      .then((response) => {
        dispatch({
            type: CREATE_RTI,
            payload: response
        });

        callback();
      });
  }
}
