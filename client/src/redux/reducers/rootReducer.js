import { combineReducers } from "redux";
import searchHistoryReducer from "./searchHistoryReducer";
import topicsReducer from "./topicsReducer";

const rootReducer = combineReducers({
  topics: topicsReducer,
  history: searchHistoryReducer,
});

export default rootReducer;
