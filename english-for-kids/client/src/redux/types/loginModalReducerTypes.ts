export interface LoginModalState {
  loginState: LoginState;
}

export enum LoginState {
  UNLOGINED,
  LOGINING,
  LOGINED
}

export enum LoginModalTypes{
  UPDATE_LOGINMODAL = 'UPDATE_LOGINMODAL',
}

export interface LoginModalAction {
  type: string;
  payload: LoginState;
}
