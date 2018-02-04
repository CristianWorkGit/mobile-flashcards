import { DecksAPI } from '../utils/api';

import * as entities from './entities';

export const addQuestion = (title, data) => async dispatch => {
  const response = await DecksAPI.addQuestion(title, data);
  return addQuestionSuccess({ response, dispatch });
};

export const addQuestionSuccess = ({ response, dispatch }) => {
  dispatch(entities.mergeDecks(JSON.parse(response)));
  return response;
};
