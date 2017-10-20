/**
 * Created by jkenny on 01/09/2017.
 * An Action Creator to asychronously fetch available User Stories associated to a single Workshop from the Cloud.
 */
import axios from 'axios';
export const GET_USERSTORIES = 'get_userstories';

const ROOT_URL = "https://127.0.0.1:8001";
//const ROOT_URL = "https://openshift-navigate-cloud25-openshiftnavigate.int.open.paas.redhat.com";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getUserStories(engagementId, workshopName, callback) {
    console.log("Action getUserStories: ", engagementId);

    return function(dispatch) {
        //You need to return your promise.
        return axios.get(`${ROOT_URL}/userstory?engagementId=${engagementId}&workshopName=${workshopName}`)
            .then(response => {
                console.log("getUserStories get response: ", response);
                callback(response);

                dispatch({
                    type: GET_USERSTORIES,
                    payload: response
                });

            })
            .catch((error) => {
                console.log(error);
            })
    }
}
