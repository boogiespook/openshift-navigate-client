/**
 * Created by jkenny on 31/08/2017.
 * An Action Creator to asychronously fetch available Workshops from the Cloud. A single
 * workshop is associated to many User stories.
 */
import axios from 'axios';
export const GET_WORKSHOPS = 'get_workshops';
export const UPDATE_WORKSHOP = 'update_workshop';

const ROOT_URL = "https://127.0.0.1:8001";
//const ROOT_URL = "https://openshift-navigate-cloud25-openshiftnavigate.int.open.paas.redhat.com";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getWorkShops(id) {
    console.log('getWorkShops for engagement Id: ', id);

    // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
    // is fullfilled, it is passed to all the reducers as regular object.
    const request = axios.get(`${ROOT_URL}/workshops?engagementId=${id}`);

    return {
        type: GET_WORKSHOPS,
        payload: request
    };
}

export function updateWorkshop(updatedWorkshop, callback) {
    // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
    // is fullfilled, it is passed to all the reducers as regular object.
    console.log("updateWorkshop requestPayload: ", updatedWorkshop);
    const request = axios.put(`${ROOT_URL}/workshops`, updatedWorkshop)
        .then((response) => {
            console.log("updateWorkshop response: ", response);
            callback(response);
        });

    return {
        type: UPDATE_WORKSHOP,
        payload: request
    }
}
