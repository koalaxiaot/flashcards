import { AsyncStorage } from 'react-native';

const STORAGE_KEY = 'udaci:decks';

const initData = {
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
};

export const fetchAll = () => AsyncStorage.getItem(STORAGE_KEY).then(data => data ? JSON.parse(data) : initData);

export const addDeck = (deck) => {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
};

export const addCard = (deck) => {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(deck));
};

AsyncStorage.clear();

// init
AsyncStorage.getItem(STORAGE_KEY).then(data => !data && AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initData)));