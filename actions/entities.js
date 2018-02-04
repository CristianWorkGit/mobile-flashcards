import { MERGE_DECKS } from '../actions';

export const mergeDecks = (decks = {}) => ({
  type: MERGE_DECKS,
  decks
});
