import axios from 'axios';

export const GET_NEXT_STEPS = 'get_NEXT_STEPS';
export const CREATE_NEXT_STEPS = 'create_NEXT_STEPS';

const API_URL = "https://localhost:8001";
//const API_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";const API_URL = "https://localhost:8001";
//const API_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getNextSteps(id) {

  // The callback is useful because we want to navigate the user only after the post comes back
  console.log('Calling get nextsteps');

  const request = axios.get(`${API_URL}/nextsteps?engagementId=${id}`, {withCredentials: true});

  return {
    type: GET_NEXT_STEPS,
    payload: request
  };
}

export function createNextSteps(payload) {

  console.log('calling create nextsteps action with payload: ' + JSON.stringify(payload));

  console.log('creating nextsteps requestPayload: ', payload);
  const request = axios.post(`${API_URL}/nextsteps`, payload, {withCredentials: true});

  return {
    type: CREATE_NEXT_STEPS,
    payload: request
  };
}