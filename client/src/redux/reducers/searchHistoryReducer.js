import { HISTORY_TYPES } from "../types";
const initialState = {
  searchedTerms: [],
  loading: false,
};

const searchHistoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case HISTORY_TYPES.LOADING_HISTORY:
      return { ...state, loading: payload };
    case HISTORY_TYPES.FETCH_HISTORY:
      return payload;
    case HISTORY_TYPES.UPDATE_HISTORY:
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
