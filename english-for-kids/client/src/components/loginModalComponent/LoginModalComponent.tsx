import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserController } from '../../controllers/userController';
import { LoginModalTypes, LoginState } from '../../redux/types/loginModalReducerTypes';
import './LoginModalStyles.scss';

export const LoginModalComponent: React.FC = () => {
  const [loginData, setLoginData] = useState({
    login: '',
    password: '',
  });
  const [errorLoginState, setErrorState] = useState(false);
  const dispatch = useDispatch();
  const changeLoginModalState = (value: LoginState): void => {
    dispatch({
      type: LoginModalTypes.UPDATE_LOGINMODAL,
      payload: value,
    });
  };

  const changeLoginInState = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({
      login: event.target.value,
      password: loginData.password,
    });
  };

  const changePasswordInState = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLoginData({
      login: loginData.login,
      password: event.target.value,
    });
  };

  const checkLoginData = (event: React.FormEvent): void => {
    event.preventDefault();
    UserController.verifyLogin(loginData.login, loginData.password).then((response) => {
      if (response) {
        dispatch({
          type: LoginModalTypes.UPDATE_LOGINMODAL,
          payload: LoginState.LOGINED,
        });
      } else {
        setErrorState(true);
      }
    });
  };

  return (
    <div className="login-form-wrapper">
      <form onSubmit={checkLoginData}>
        <h2>Login</h2>
        <input type="text" placeholder="login" value={loginData.login} onChange={changeLoginInState} />
        <input type="password" placeholder="password" value={loginData.password} onChange={changePasswordInState} />
        <div className="buttons">
          <button
            type="button"
            onClick={() => {
              changeLoginModalState(LoginState.UNLOGINED);
              setErrorState(false);
            }}
          >
            Close
          </button>
          <button type="submit">Login</button>
        </div>
        {(errorLoginState) && (<h3 className="error-text">Wrong Login or Password</h3>)}
      </form>
    </div>
  );
};
