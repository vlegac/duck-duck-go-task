const initialState = [];

const topicsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_TOPICS":
      return payload;
    default:
      return state;
  }
};

export default topicsReducer;
