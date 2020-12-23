const initialState = {
  topics: [],
  searchValue: "",
};

const topicsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_TOPICS":
      return { ...state, topics: payload };
    case "HISTORY_FETCH_TOPICS":
      return { ...state, searchValue: payload };
    default:
      return state;
  }
};

export default topicsReducer;
