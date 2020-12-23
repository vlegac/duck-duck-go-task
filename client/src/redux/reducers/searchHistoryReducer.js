const initialState = {};

const searchHistoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_HISTORY":
      return payload;
    case "UPDATE_HISTORY":
      const newState = {
        ...state,
        searchedTerms: [...state.searchedTerms, { term: payload }],
      };
      return newState;
    default:
      return state;
  }
};

export default searchHistoryReducer;
