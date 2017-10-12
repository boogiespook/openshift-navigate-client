/**
 * Created by jkenny on 01/09/2017.
 */
/**
 * Created by jkenny on 31/08/2017.
 * This reducer manages the Workshops state in the Redux global application state.
 */
import {GET_USERSTORIES} from "../actions/action_userStories";
import {DELETE_USER_STORY} from "../actions/action_userStory";
import _ from "lodash";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_USERSTORIES: {
            console.log("UserStories Reducer Get action payload: ", action.payload);
            return _.mapKeys(action.payload.data, "usId");
        }

        case DELETE_USER_STORY: {
            console.log("UserStories Reducer Delete action payload: ", action.payload);
            return state;
        }

        default:
            return state;
    }
}