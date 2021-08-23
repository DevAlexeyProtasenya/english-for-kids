import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { CardType } from '../../../common/entities/Card';
import './AdminCardStyles.scss';
import { CardController } from '../../../controllers/cardController';
import { UseTypeSelector } from '../../../hooks/useTypeSelector';

import { AdminCardsTypes } from '../../../redux/types/adminChangeCardsType';

interface AdminCardProperties {
  card: CardType;
}

export const AdminCardComponent: React.FC<AdminCardProperties> = ({ card }) => {
  const [adminCardState, changeAdminCard] = useState({
    isUpdating: false,
    isError: false,
    value: '',
  });

  const adminCardsState = UseTypeSelector((state) => state);
  const dispatch = useDispatch();

  const deleteCard = (): void => {
    CardController.deleteCard(card.id).then((response) => {
      if (response === 200) {
        dispatch({
          type: AdminCardsTypes.UPDATE_ADMIN_CARD_STATE,
          payload: true,
        });
      }
    });
  };

  const playAudio = (): void => {
    const audio = new Audio(card.sound);
    audio.play();
  };

  return (
    <div className="admin-card" key={card.id}>
      <h4>{`Word: ${card.word}`}</h4>
      <h4>{`Translation: ${card.translate}`}</h4>
      <h4>
        {`Sound file: ${card.sound.match(/\w+\.\w+$/)}`}
        <button type="button" onClick={playAudio}> play </button>
      </h4>
      <h4>Image: </h4>
      <img src={card.imageSRC} alt={card.word} />
      <button className="card-btn" type="button">Update</button>
      <button className="delete-card" type="button" onClick={deleteCard}>Delete</button>
    </div>
  );
};

AdminCardComponent.propTypes = {
  card: PropTypes.exact({
    id: PropTypes.number.isRequired,
    idCategory: PropTypes.number.isRequired,
    word: PropTypes.string.isRequired,
    translate: PropTypes.string.isRequired,
    imageSRC: PropTypes.string.isRequired,
    sound: PropTypes.string.isRequired,
  }).isRequired,
};
