/**
 * Created by jkenny on 04/09/2017.
 * This reducer manages the Openshift Navigate Configuration data in the Redux global application state.
 */
import {GET_CONFIGURATION} from "../actions/action_configurations";

export default function(state = {}, action) {
    // console.log("reducer_configurations state: ", state);
    // console.log("reducer_configurations action: ",  action);

    switch (action.type) {
        case GET_CONFIGURATION: {
            console.log("Configuration Reducer action payload: ", action.payload);
            return action.payload.data;
        }

        default:
            return state;
    }
}