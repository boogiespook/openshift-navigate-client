import axios from 'axios';
export const GET_ARCH_REVIEW = 'get_archreview';
export const UPDATE_ARCH_REVIEW = 'update_archreview';

const API_URL = "https://localhost:8001";
//const API_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";const API_URL = "https://localhost:8001";

export function getArchReview(id) {
  // The callback is useful because we want to navigate the user only after the post comes back

  // console.log('calling get architecture review for ');

  const request = axios.get(`${API_URL}/archquestions?engagementId=${id}`, {withCredentials: true});

  return {
    type: GET_ARCH_REVIEW,
    payload: request
  };
}

export function saveReview(id, values, category, callback) {
  // The callback is useful because we want to navigate the user only after the post comes back

  // console.log('calling saveReview');
  // console.log(JSON.stringify(arguments));

  let payload = {
    engagementId: id,
    category: category,
    answers: values
  }

  const request = axios.put(`${API_URL}/archquestions`, payload, {withCredentials: true})
    // .then(() => callback());

  return {
    type: UPDATE_ARCH_REVIEW,
    payload: request
  };
}
