import React, { Dispatch, useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import './CardStyle.scss';
import { CategoryAction, CategoryTypes } from '../../redux/types/categoryReducerTypes';
import { changeStatistic, StatisticMethods } from '../../common/StatisticCommon';
import { CardType } from '../../common/entities/Card';

export interface CardProperties {
  card: CardType;
}

export const CardComponent: React.FC<CardProperties> = ({ card }) => {
  const playState = UseTypeSelector((state) => state.playState);

  const gameState = UseTypeSelector((state) => state.gameState);

  const classesCard: Array<string> = ['flip-card-front'];

  const classesMainCard: Array<string> = ['play-style'];

  const classesForHover: Array<string> = ['flip-card-inner'];

  const [cardState, changeCardState] = useState(false);

  if (playState.playState) {
    classesCard.push('play');
    classesMainCard.push('play');
  }

  if (cardState) {
    classesForHover.push('rotate');
  }

  const playSound = (event: React.MouseEvent<HTMLDivElement>): void => {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('turn-btn')) {
      const audio = new Audio(card.sound);
      audio.play();
    }
  };

  const dispatch = useDispatch<Dispatch<CategoryAction>>();
  const changeCategory = (): void => {
    const categoryID = card.id;
    dispatch({
      type: CategoryTypes.UPDATE_CATEGORY,
      payload: categoryID,
    });
  };

  const backCard = (): void => {
    changeCardState((cardState) => true);
  };

  const frontCard = (): void => {
    changeCardState((cardState) => false);
  };

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>): void => {
    playSound(event);
    changeStatistic(card.id, StatisticMethods.ADD_CLICK);
  };

  return (
    card.idCategory !== 0 ? (
      <div className="flip-card" onMouseLeave={frontCard}>
        <div className={classesForHover.join(' ')}>
          <Card
            onClick={!playState.playState ? clickHandler : () => {}}
            className={classesCard.join(' ')}
          >
            <Card.Img variant="top" src={card.imageSRC} />
            {!playState.playState && (
            <Card.Body>
              <Card.Title>{card.word}</Card.Title>
              <button className="turn-btn" type="button" onClick={backCard}>
                button
              </button>
            </Card.Body>
            )}
          </Card>
          <Card onClick={clickHandler} className="flip-card-back">
            <Card.Img variant="top" src={card.imageSRC} />
            {!playState.playState && (
            <Card.Body>
              <Card.Title>{card.translate}</Card.Title>
            </Card.Body>
            )}
          </Card>
        </div>
      </div>
    ) : (
      <Card className="main-card" onClick={changeCategory}>
        <div className={classesMainCard.join(' ')}>
          <div className="img-wrapper">
            {/* <Card.Img variant="top" src={card.imageSRC} /> */}
          </div>
        </div>
        <Card.Body>
          <Card.Title>{card.word}</Card.Title>
        </Card.Body>
      </Card>
    )
  );
};

CardComponent.propTypes = {
  card: PropTypes.exact({
    id: PropTypes.number.isRequired,
    idCategory: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired,
    imageSRC: PropTypes.string.isRequired,
    sound: PropTypes.string.isRequired,
  }).isRequired,
};
