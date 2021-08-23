import {
  LoginModalAction, LoginModalState, LoginModalTypes, LoginState,
} from '../types/loginModalReducerTypes';

const initialLoginModalState = {
  loginState: LoginState.UNLOGINED,
};

export const loginModalRedycer = (
  state = initialLoginModalState,
  action: LoginModalAction,
): LoginModalState => {
  switch (action.type) {
    case LoginModalTypes.UPDATE_LOGINMODAL: return {
      loginState: action.payload,
    };
    default: return state;
  }
};
