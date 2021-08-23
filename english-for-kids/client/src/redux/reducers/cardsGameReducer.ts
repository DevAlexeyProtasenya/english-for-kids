import { CardsGameAction, CardsGameState, CardsGameTypes } from '../types/cardsGameTypes';

const initialGameState: CardsGameState = {
  gameCards: [],
  cardNumber: 0,
  correctCards: [],
  userClicks: [],
};

export const cardsGameRedycer = (
  state = initialGameState,
  action: CardsGameAction,
): CardsGameState => {
  switch (action.type) {
    case CardsGameTypes.UPDATE_CARD: return {
      gameCards: action.payload.gameCards,
      cardNumber: action.payload.cardNumber,
      correctCards: action.payload.correctCards,
      userClicks: action.payload.userClicks,
    };
    case CardsGameTypes.CLEAR_CARDS: return initialGameState;
    default: return state;
  }
};
