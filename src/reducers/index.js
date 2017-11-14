import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import EngagementsReducer from "./reducer_engagements";
import ArchReviewReducer from "./reducer_archreview";
import BusinessReviewReducer from "./reducer_businessreview";
import RtiReducer from "./reducer_rti";
import GoalsReducer from "./reducer_goals";
import WorkshopsReducer from "./reducer_workshops";
import UserStoriesReducer from "./reducer_userStories";
import Configurations from "./reducer_configuration";
import DashboardReducer from "./reducer_dashboard";
import NextStepsReducer from "./reducer_nextSteps";
import MindMapReducer from "./reducer_mindmap";
import InitConfigReducer from "./reducer_init_config";

// NOTE: see mapDispatchToProps as a way to connect an action creator to all reducers

const rootReducer = combineReducers({
  initConfig: InitConfigReducer,
  engagements: EngagementsReducer,
  workshops: WorkshopsReducer,
  userstories: UserStoriesReducer,
  engagementConfig: Configurations,
  archReview: ArchReviewReducer,
  rti: RtiReducer,
  //loginForm: formReducer,  // not sure if this is required, need to come back to this.
  goals: GoalsReducer,
  form: formReducer,    // if we dont have this then input fields are not working
  dashboardState: DashboardReducer,
  nextSteps: NextStepsReducer,
  businessReview: BusinessReviewReducer,
  mapDetails: MindMapReducer
});

export default rootReducer;
