import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { LoginModalTypes, LoginState } from '../../../redux/types/loginModalReducerTypes';
import './AdminHeaderStyles.scss';

const AdminHeaderComponent: React.FC = () => {
  const dispatch = useDispatch();
  const changeLoginModalState = (): void => {
    localStorage.removeItem('login');
    dispatch({
      type: LoginModalTypes.UPDATE_LOGINMODAL,
      payload: LoginState.UNLOGINED,
    });
  };
  return (
    <header className="admin-header">
      <ul>
        <li key="1"><Link to="/">Categories</Link></li>
        <li key="2">Words</li>
      </ul>
      <button type="button" className="logout-btn" onClick={changeLoginModalState}>Log out</button>
    </header>
  );
};

export default AdminHeaderComponent;
