import {
  GameAction, GameState, GameStates, GameTypes,
} from '../types/gameReducerTypes';

const initialGameState = {
  gameState: GameStates.DISABLED,
};

export const gameRedycer = (
  state = initialGameState,
  action: GameAction,
): GameState => {
  switch (action.type) {
    case GameTypes.UPDATE_GAME: return {
      gameState: action.payload,
    };
    default: return state;
  }
};
