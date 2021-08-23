export interface CardsGameState {
  gameCards: Array<GameCard>;
  cardNumber: number;
  correctCards: Array<number>;
  userClicks: Array<{click: boolean, id: number}>;
}

export enum CardsGameTypes{
  UPDATE_CARD = 'UPDATE_CARD',
  CLEAR_CARDS = 'CLEAR_CARDS',
}

export interface CardsGameAction {
  type: string;
  payload: CardsGameState;
}

export interface GameCard {
  id: number;
  idCategory: number;
  word: string;
  translate: string;
  imageSRC: string;
  sound: string;
}
