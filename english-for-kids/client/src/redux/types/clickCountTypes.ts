export interface ClickCountState {
  gameClicks: number;
  correctClicks: number;
}

export enum ClickCountTypes{
  UPDATE_CLICK_COUNT = 'UPDATE_CLICK_COUNT',
  CLEAR_COUNTS = 'CLEAR_COUNTS'
}

export interface ClickCountAction {
  type: string;
  payload: number[];
}
