import { CardAdminChangeAction, CardAdminChangeState, CardAdminChangeTypes } from '../types/cardsAdminChangesdType';

const initialPlayState = {
  changeAdminCardState: false,
};

export const changeAdminCardStateRedycer = (
  state = initialPlayState,
  action: CardAdminChangeAction,
): CardAdminChangeState => {
  switch (action.type) {
    case CardAdminChangeTypes.UPDATE_ADMIN_CARD_STATE: return {
      changeAdminCardState: action.payload,
    };
    default: return state;
  }
};
