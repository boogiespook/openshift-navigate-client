/**
 * Created by jkenny on 31/08/2017.
 * This reducer manages the Workshops state in the Redux global application state.
 */
import {GET_WORKSHOPS} from "../actions/action_workshops";
import {UPDATE_WORKSHOP} from "../actions/action_workshops";
import _ from "lodash";

export default function(state = {}, action) {
    // console.log("reducer_workshops state: ", state);
    // console.log("reducer_workshops action: ",  action);

    switch (action.type) {
        case GET_WORKSHOPS: {
            console.log("Workshops Reducer action payload: ", action.payload);
            return _.mapKeys(action.payload.data, "workShopId");
        }

        case UPDATE_WORKSHOP: {
            console.log("Workshops Reducer action payload: ", action.payload);
            return state;
        }

        default:
            return state;
    }
}