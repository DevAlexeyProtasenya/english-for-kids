export interface AdminCardsState {
  adminCardsState: boolean;
}

export enum AdminCardsTypes{
  UPDATE_ADMIN_CARD_STATE = 'UPDATE_ADMIN_CARD_STATE',
}

export interface AdminCardsAction {
  type: string;
  payload: boolean;
}
