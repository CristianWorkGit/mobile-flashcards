import { MERGE_DECKS, MERGE_QUESTIONS } from '../actions';

const ACTION_HANDLERS = {
  [MERGE_DECKS]: (state, { decks }) => {
    return {
      ...state,
      decks: {
        ...state.decks,
        ...decks
      }
    };
  }
};

/* Initial state default */
export const initialState = {
  decks: {}
};

export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state;
}
