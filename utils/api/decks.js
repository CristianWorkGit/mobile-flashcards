import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'mobile-flashcards:decks-cards';

export const DecksAPI = {
  listAllDecks() {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY);
  },

  addDeck(title) {
    return AsyncStorage.mergeItem(
      DECKS_STORAGE_KEY,
      JSON.stringify({
        [title]: {
          title,
          questions: []
        }
      })
    ).then(() => this.listAllDecks());
  },

  addQuestion(title, card) {
    return AsyncStorage.getItem(DECKS_STORAGE_KEY)
      .then(result => {
        const myStorageResults = JSON.parse(result);
        const oldQuestions = myStorageResults[title].questions;

        return AsyncStorage.mergeItem(
          DECKS_STORAGE_KEY,
          JSON.stringify({
            [title]: {
              questions: [
                ...oldQuestions,
                {
                  question: card.question,
                  answer: card.answer
                }
              ]
            }
          })
        );
      })
      .then(() => this.listAllDecks());
  }
};
