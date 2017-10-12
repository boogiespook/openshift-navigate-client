import axios from 'axios';
export const GET_BUSINESS_REVIEW = 'get_business_review';
export const UPDATE_BUSINESS_REVIEW = 'update_business_review';

const ROOT_URL = "http://127.0.0.1:8001";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";

export function getReview(id) {
  const request = axios.get(`${ROOT_URL}/businessreview?engagementId=${id}`);

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
  const request = axios.put(`${ROOT_URL}/businessreview`, payload)
    // .then(() => callback());

  return {
    type: UPDATE_BUSINESS_REVIEW,
    payload: request
  };
}
