import PropTypes from 'prop-types';
import React, { Dispatch, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { CategoryTypes } from '../../redux/types/categoryReducerTypes';
import './NavbarStyles.scss';
import { CategortyController } from '../../controllers/categoryController';
import { Category } from '../../common/entities/Category';
import { LoginModalTypes, LoginState } from '../../redux/types/loginModalReducerTypes';

interface navState {
  navBarState: boolean
}

export const Navbar: React.FC<navState> = ({ navBarState }) => {
  const classes = ['burger-nav'];
  const closeNavState = UseTypeSelector((state) => state.playState);
  if (navBarState) {
    classes.push('opened-nav');
  } else {
    classes.push('closed-nav');
  }
  if (closeNavState.playState) {
    classes.push('play');
  }

  const loginModalState = UseTypeSelector((state) => state.loginModalState);

  const [getCategoriesState, setState] = useState({
    isLoad: true,
    data: [{ id: 0, name: 'Main Page' }],
  } as {
    isLoad: boolean,
    data: Array<Category>,
  });

  useEffect(() => {
    if (getCategoriesState.isLoad === true) {
      CategortyController.getAllCategory().then((response) => {
        const stat = [{
          id: -2,
          name: 'Statistics',
        }];
        setState({
          isLoad: false,
          data: getCategoriesState.data.concat(response).concat(stat),
        });
      });
    }
  });

  const dispatch = useDispatch();
  const changeCategory = (event: React.MouseEvent<HTMLAnchorElement | HTMLDivElement>): void => {
    const target = event.target as HTMLAnchorElement;
    dispatch({
      type: CategoryTypes.UPDATE_CATEGORY,
      payload: parseInt(target.id, 10),
    });
  };

  const changeLoginModalState = (): void => {
    dispatch({
      type: LoginModalTypes.UPDATE_LOGINMODAL,
      payload: LoginState.LOGINING,
    });
  };

  if (getCategoriesState.isLoad) { return <div>Data is loading from API...</div>; }

  return (
    <div className={classes.join(' ')}>
      <ul className="burger-nav__items">
        {getCategoriesState.data.map((category) => (
          <Link
            to={category.id !== -2 ? '/cards' : '/statistic'}
            key={category.id}
            id={category.id.toString()}
            onClick={changeCategory}
          >
            { category.name }
          </Link>
        ))}
      </ul>
      {(loginModalState.loginState !== LoginState.LOGINED) && (
        <button type="button" className="login-button" onClick={changeLoginModalState}>Log in</button>
      )}
    </div>
  );
};

Navbar.propTypes = {
  navBarState: PropTypes.bool.isRequired,
};
