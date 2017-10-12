/**
 * Created by jkenny on 11/09/2017.
 */
import {GET_WORKSHOPS} from "../actions/action_workshops";
import {GET_USERSTORIES} from "../actions/action_userStories";
import {GET_CONFIGURATION} from "../actions/action_configurations";
import {GET_BUSINESS_GOALS} from "../actions/action_business_goals";
import _ from "lodash";

export default function(state = {}, action) {
    switch (action.type) {
        case GET_USERSTORIES: {
            console.log("Dashboard Reducer userstories action payload: ", action.payload);
            const newState = {...state, userstories : _.mapKeys(action.payload.data, "usId")};
            return newState;
        }

        case GET_WORKSHOPS: {
            console.log("Dashboard Reducer workshops action payload: ", action.payload);
            const newState = {...state, workshops : _.mapKeys(action.payload.data, "workShopId")};
            return newState;
        }

        case GET_CONFIGURATION: {
            console.log("Dashboard Reducer configuration action payload: ", action.payload);
            const newState = {...state, configuration : action.payload.data};
            return newState;
        }

        case GET_BUSINESS_GOALS: {
            console.log("Dashboard Reducer business goals action payload: ", action.payload);
            const newState = {...state, proCharter: action.payload.data.goals};
            return newState;
        }

        default:
            return state;
    }
}