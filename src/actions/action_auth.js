import axios from 'axios';
export const LOGIN = 'login';

const ROOT_URL = "http://127.0.0.1:8001";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";

export function login(credentials, callback) {
  // The callback is useful because we want to navigate the user only after the post comes back
  const request = axios.post(`${ROOT_URL}/auth/login`, credentials)
    .then(() => callback());

  return {
    type: LOGIN,
    payload: request
  };
}