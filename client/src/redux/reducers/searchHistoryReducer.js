const initialState = {
  searchedTerms: [],
};

const searchHistoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "FETCH_HISTORY":
      return payload;
    case "UPDATE_HISTORY":
      if (state.searchedTerms !== undefined) {
        const newState = {
          ...state,
          searchedTerms: [...state.searchedTerms, { term: payload }],
        };
        return newState;
      } else {
        const newState = {
          ...state,
          searchedTerms: [{ term: payload }],
        };
        return newState;
      }

    default:
      return state;
  }
};

export default searchHistoryReducer;
