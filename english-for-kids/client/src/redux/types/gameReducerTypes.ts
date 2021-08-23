export interface GameState {
  gameState: GameStates;
}

export enum GameStates {
  DISABLED,
  PLAYING,
  ENDING,
}

export enum GameTypes{
  UPDATE_GAME = 'UPDATE_GAME',
}

export interface GameAction {
  type: string;
  payload: GameStates;
}
