import { ADD_CARD, ADD_DECK, RECEIVE_DECKS } from '../actions';

const decks = (state = {}, action) => {

  switch (action.type) {

    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      }

    case ADD_CARD:
    case ADD_DECK:
      return { ...state, ...action.deck };

    default:
      return state;
  }

}

export default decks;