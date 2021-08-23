import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import HeaderComponent from './components/header/HeaderComponent';
import { Navbar } from './components/navbar/NavbarComponent';
import './App.scss';
import { CardsFieldComponent } from './components/cards/CardsFieldComponent';
import { UseTypeSelector } from './hooks/useTypeSelector';
import { StatisticsComponent } from './components/statistic/StatistickComponent';
import { SortFields, SortReducerTypes, SortType } from './redux/types/sortTypes';
import { LoginModalComponent } from './components/loginModalComponent/LoginModalComponent';
import { LoginModalTypes, LoginState } from './redux/types/loginModalReducerTypes';
import AdminHeaderComponent from './components/adminsComponents/adminHeaderComponent/AdminHeaderComponent';
import AdminFieldCategoryComponent from './components/adminsComponents/adminCategorryFields/AdminFieldCategoryComponent';
import AdminCardsFieldComponent from './components/adminsComponents/adminCardsField/AdminCardsFieldComponent';

const App: React.FC = () => {
  const [navBarState, setNavState] = useState(false);

  const loginModalState = UseTypeSelector((state) => state.loginModalState);

  const onChangeNavbarState = (): void => {
    setNavState((prev) => !prev);
  };
  const dispatch = useDispatch();
  const changeSortState = (fieldSort: SortFields, typeSort: SortType): void => {
    dispatch({
      type: SortReducerTypes.UPDATE_SORT,
      payload: {
        sort: fieldSort,
        type: typeSort,
      },
    });
  };

  const changeLoginModalState = (): void => {
    dispatch({
      type: LoginModalTypes.UPDATE_LOGINMODAL,
      payload: LoginState.LOGINED,
    });
  };

  if (localStorage.getItem('login') !== null && loginModalState.loginState !== LoginState.LOGINED) {
    changeLoginModalState();
  }
  changeSortState(SortFields.CATEGORY, SortType.DESC);

  return (
    <main>
      {(loginModalState.loginState !== LoginState.LOGINED)
      && (
      <div>
        <Navbar
          navBarState={navBarState}
        />
        <HeaderComponent
          onToggleNav={onChangeNavbarState}
          navBarState={navBarState}
        />
        <Switch>
          <Route exact path="/" component={CardsFieldComponent} />
          <Route path="/statistic" component={StatisticsComponent} />
          <Route path="/cards" component={CardsFieldComponent} />
        </Switch>
        {(loginModalState.loginState === LoginState.LOGINING) && (
        <LoginModalComponent />
        )}
      </div>
      )}
      {
        (loginModalState.loginState === LoginState.LOGINED) && (
          <div>
            <AdminHeaderComponent />
            <Switch>
              <Route exact path="/" component={AdminFieldCategoryComponent} />
              <Route path="/:category" component={AdminCardsFieldComponent} />
            </Switch>
          </div>
        )
      }
    </main>
  );
};

export default App;
