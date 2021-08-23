import React from 'react';
import PropTypes from 'prop-types';
import Switch from 'react-switch';
import { useDispatch } from 'react-redux';
import closeBtn from '../../assets/icons/closeBtnIcon.png';
import openBtn from '../../assets/icons/openBtnIcon.png';
import './HeaderStyles.scss';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { PlayTypes } from '../../redux/types/playReducerTypes';
import { GameTypes } from '../../redux/types/gameReducerTypes';
import { CardsGameTypes } from '../../redux/types/cardsGameTypes';

type HeaderProperties = {
  navBarState: boolean;
  onToggleNav(): void;
}

const HeaderComponent: React.FC<HeaderProperties> = ({
  onToggleNav,
  navBarState,
}) => {
  const dispatch = useDispatch();
  const state = UseTypeSelector((state) => state.playState);
  const changeState = (): void => {
    dispatch({
      type: PlayTypes.UPDATE_PLAY,
      payload: !state.playState,
    });
    dispatch({
      type: GameTypes.UPDATE_GAME,
      payload: false,
    });
    dispatch({
      type: CardsGameTypes.UPDATE_CARD,
      payload: {
        gameCards: [],
        cardNumber: 0,
        correctCards: [],
        userClicks: [],
      },
    });
  };
  return (
    <div className="header">
      <div className="burger-icon">
        <img src={navBarState ? closeBtn : openBtn} alt="Navbar button" />
        <input type="checkbox" className="nav-button" onClick={onToggleNav} />
      </div>
      <Switch
        className="switch"
        onChange={changeState}
        checked={!state.playState}
        onColor="#00BF82"
        offColor="#fc6262"
        handleDiameter={50}
        checkedIcon={(
          <div className="switch-text">
            Train
          </div>
        )}
        uncheckedIcon={(
          <div className="switch-text">
            Play
          </div>
        )}
        width={120}
        height={50}
      />
      {
        (navBarState) && (
          <div className="hidden-block" onClick={onToggleNav} role="none" />
        )
      }
    </div>
  );
};

HeaderComponent.propTypes = {
  navBarState: PropTypes.bool.isRequired,
  onToggleNav: PropTypes.func.isRequired,
};

export default HeaderComponent;
