export interface CardAdminChangeState {
  changeAdminCardState: boolean;
}

export enum CardAdminChangeTypes{
  UPDATE_ADMIN_CARD_STATE = 'UPDATE_ADMIN_CARD_STATE',
}

export interface CardAdminChangeAction {
  type: string;
  payload: boolean;
}
