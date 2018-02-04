import { DecksAPI } from '../utils/api';

import * as entities from './entities';

export const getDecks = () => async dispatch => {
  const response = await DecksAPI.listAllDecks();
  return getDecksSuccess({ response, dispatch });
};

export const getDecksSuccess = ({ response, dispatch }) => {
  dispatch(entities.mergeDecks(JSON.parse(response)));
  return response;
};

export const addDeck = title => async dispatch => {
  const response = await DecksAPI.addDeck(title);
  return addDeckSuccess({ response, dispatch });
};

export const addDeckSuccess = ({ response, dispatch }) => {
  dispatch(entities.mergeDecks(JSON.parse(response)));
  return response;
};
