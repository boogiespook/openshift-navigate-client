import axios from 'axios';

export const GET_ENGAGEMENTS = 'get_engagements';
export const CREATE_ENGAGEMENT = 'create_engagement';

const ROOT_URL = "http://127.0.0.1:8001";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";

export function getEngagements() {
  // The callback is useful because we want to navigate the user only after the post comes back

  console.log('calling get Engagements');

  const request = axios.get(`${ROOT_URL}/engagement`);

  return {
    type: GET_ENGAGEMENTS,
    payload: request
  };
}

export function createEngagement(name, callback) {

  return function (dispatch) {
    console.log('calling create Engagements action');

    let requestPayload = {
      'name': name
    };

    console.log('creating engagement requestPayload: ', requestPayload);
    axios.post(`${ROOT_URL}/engagement`, requestPayload)
      .then((response) => {
        dispatch({
            type: CREATE_ENGAGEMENT,
            payload: response
        });

        callback();
      });
  }
}


  // console.log('calling create Engagements action');

  // let requestPayload = {
  //   'name': name
  // };

  // console.log('creating engagement requestPayload: ', requestPayload);
  // const request = axios.post(`${ROOT_URL}/engagement`, requestPayload)
  //   .then(() => {
  //     callback();
  //   });

  // return {
  //   type: CREATE_ENGAGEMENT,
  //   payload: request
  // };