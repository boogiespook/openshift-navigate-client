import axios from 'axios';

export const GET_BUSINESS_GOALS = 'get_business_goals';
export const SET_BUSINESS_GOALS = 'set_business_goals';

const ROOT_URL = "https://127.0.0.1:8001";
//const ROOT_URL = "https://openshift-navigate-cloud25-openshiftnavigate.int.open.paas.redhat.com";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getBusinessGoals(id) {
  // The callback is useful because we want to navigate the user only after the post comes back

  console.log('calling get business goals');

  const request = axios.get(`${ROOT_URL}/businessgoals?engagementId=${id}`);

  return {
    type: GET_BUSINESS_GOALS,
    payload: request
  };
}

export function setBusinessGoals(engagementId, newGoals) {
  // The callback is useful because we want to navigate the user only after the post comes back
   let requestPayload = {
    engagementId: engagementId,
    goals: newGoals
   };

  console.log('setBusinessGoals requestPayload: ', requestPayload);
  axios.put(`${ROOT_URL}/businessgoals`, requestPayload);

  return {
    type: SET_BUSINESS_GOALS,
    payload: newGoals
  };
}
