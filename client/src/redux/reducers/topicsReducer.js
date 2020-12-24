import { TOPIC_TYPES } from "../types";
const initialState = {
  topics: [],
  searchValue: "",
  loading: false,
};

const topicsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case TOPIC_TYPES.LOADING_TOPICS:
      console.log(payload);
      return { ...state, loading: payload };
    case TOPIC_TYPES.FETCH_TOPICS:
      return { ...state, topics: payload };
    case TOPIC_TYPES.HISTORY_FETCH_TOPICS:
      return { ...state, searchValue: payload };
    default:
      return state;
  }
};

export default topicsReducer;
