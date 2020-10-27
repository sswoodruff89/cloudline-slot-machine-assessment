import { combineReducers } from "redux";
import { listTally } from "./tallyReducer";

export default combineReducers({
  tally: listTally
});
