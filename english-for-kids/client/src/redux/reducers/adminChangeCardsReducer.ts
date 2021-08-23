import { AdminCardsAction, AdminCardsState, AdminCardsTypes } from '../types/adminChangeCardsType';

const initialPlayState = {
  adminCardsState: false,
};

export const AdminChangeCardStateRedycer = (
  state = initialPlayState,
  action: AdminCardsAction,
): AdminCardsState => {
  switch (action.type) {
    case AdminCardsTypes.UPDATE_ADMIN_CARD_STATE: return {
      adminCardsState: action.payload,
    };
    default: return state;
  }
};
