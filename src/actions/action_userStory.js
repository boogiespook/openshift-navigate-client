/**
 * Created by jkenny on 01/09/2017.
 * An Action Creator to manage User Story create, update and delete.
 */

import axios from 'axios';
export const UPDATE_USER_STORY = "update_user_story";
export const DELETE_USER_STORY = "delete_user_story";

//const ROOT_URL = "https://localhost:8001";
const ROOT_URL = "https://openshiftnavcloud-openshiftnavigate.int.open.paas.redhat.com";//const ROOT_URL = "https://localhost:8001";

export function updateUserStory(values, callback) {
    // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
    // is fullfilled, it is passed to all the reducers as regular object.
    console.log("updateUserStory values: ", values);

    const request = axios.put(`${ROOT_URL}/userstory`, values, {withCredentials: true})
        .then((response) => {
            console.log("updateUserStory response: ", response);
            callback(response);
        });

    return {
        type: UPDATE_USER_STORY,
        payload: request
    }
}

export function deleteUserStory(guid, callback) {

    console.log("deleteUserStory values: ", guid);
    // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
    // is fullfilled, it is passed to all the reducers as regular object.
    const request = axios.delete(`${ROOT_URL}/userstory/?storyId=${guid}`, {withCredentials: true})
        .then((response) => {
            callback(response);
        });

    return {
        type: DELETE_USER_STORY,
        payload: request
    }
}