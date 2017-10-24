/**
 * Created by jkenny on 04/09/2017.
 * An Action Creator to asychronously fetch Openshift Navigate configuration data from the Cloud. Configuration
 * data is used to populate drop downs and apply default values etc
 */
import axios from 'axios';
export const GET_CONFIGURATION = 'get_configuration';

const ROOT_URL = "https://localhost:8001";
//const ROOT_URL = "https://psdev-hbosx7gau4hzdbzau4oipixq-evals-dev.mbaas1.tom.redhatmobile.com";


export function getConfigurationData(id) {
    console.log('getConfigurationData for configId Id: ', id);

    // Note: axios returns a promise, which is intercepted by redux-promise middleware, once the request
    // is fullfilled, it is passed to all the reducers as regular object.
    const request = axios.get(`${ROOT_URL}/engagementconfig?configId=${id}`, {withCredentials: true});

    return {
        type: GET_CONFIGURATION,
        payload: request
    };
}