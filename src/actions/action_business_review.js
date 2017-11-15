import axios from 'axios';
export const GET_BUSINESS_REVIEW = 'get_business_review';
export const UPDATE_BUSINESS_REVIEW = 'update_business_review';

const API_URL = "https://localhost:8001";
//const API_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";const API_URL = "https://localhost:8001";
//const API_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getReview(id) {
  const request = axios.get(`${API_URL}/businessreview?engagementId=${id}`, {withCredentials: true});

  return {
    type: GET_BUSINESS_REVIEW,
    payload: request
  };
}

export function saveReview(id, values, category, callback) {


  let payload = {
    engagementId: id,
    category: category,
    answers: values
  }
  const request = axios.put(`${API_URL}/businessreview`, payload, {withCredentials: true})
    // .then(() => callback());

  return {
    type: UPDATE_BUSINESS_REVIEW,
    payload: request
  };
}
