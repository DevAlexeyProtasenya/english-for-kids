import { ClickCountAction, ClickCountState, ClickCountTypes } from '../types/clickCountTypes';

const initialGameState = {
  gameClicks: 0,
  correctClicks: 0,
};

export const clickCountRedycer = (
  state = initialGameState,
  action: ClickCountAction,
): ClickCountState => {
  switch (action.type) {
    case ClickCountTypes.UPDATE_CLICK_COUNT: return {
      gameClicks: action.payload[0],
      correctClicks: action.payload[1],
    };
    default: return state;
  }
};
