import axios from 'axios';
export const GET_MIND_MAP = 'get_mindmap';

const ROOT_URL = "https://127.0.0.1:8001";
//const ROOT_URL = "https://openshift-navigate-cloud25-openshiftnavigate.int.open.paas.redhat.com";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getMapDetails(id) {

  const request = axios.get(`${ROOT_URL}/mindmap`);

  return {
    type: GET_MIND_MAP,
    payload: request
  };
}

