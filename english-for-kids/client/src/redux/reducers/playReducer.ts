import { PlayTypes, PlayState, PlayAction } from '../types/playReducerTypes';

const initialPlayState = {
  playState: false,
};

export const playRedycer = (
  state = initialPlayState,
  action: PlayAction,
): PlayState => {
  switch (action.type) {
    case PlayTypes.UPDATE_PLAY: return {
      playState: action.payload,
    };
    default: return state;
  }
};
