export interface PlayState {
  playState: boolean;
}

export enum PlayTypes{
  UPDATE_PLAY = 'UPDATE_PLAY',
}

export interface PlayAction {
  type: string;
  payload: boolean;
}
