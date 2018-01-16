export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const ADD_CARD = 'ADD_CARD'
export const ADD_DECK = 'ADD_DECK'

export const receiveDecks = decks => ({
  type: RECEIVE_DECKS,
  decks
});

export const addCard = deck => ({
  type: ADD_CARD,
  deck
});

export const addDeck = deck => ({
  type: ADD_DECK,
  deck
});