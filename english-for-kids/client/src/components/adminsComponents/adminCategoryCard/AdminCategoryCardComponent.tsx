import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Category } from '../../../common/entities/Category';
import { CardController } from '../../../controllers/cardController';
import './AdminCategoryCardStyles.scss';
import { CategortyController } from '../../../controllers/categoryController';
import { CardAdminChangeTypes } from '../../../redux/types/cardsAdminChangesdType';

interface AdminCategoryProperties {
  card: Category;
}

export const AdminCategoryCardComponent: React.FC<AdminCategoryProperties> = ({ card }) => {
  const [amountOfWordState, changeAmountOfWord] = useState(0);
  const [adminCardState, changeAdminCard] = useState({
    isUpdating: false,
    isError: false,
    value: '',
  });
  useEffect(() => {
    CardController.getCardByCategory(card.id).then((response) => {
      changeAmountOfWord(response.length);
    });
  });
  const dispatch = useDispatch();

  const viewUpdateCardForm = (): void => {
    changeAdminCard({
      isUpdating: true,
      isError: false,
      value: card.name,
    });
  };

  const cancelCardForm = (): void => {
    changeAdminCard({
      isUpdating: false,
      isError: false,
      value: '',
    });
  };

  const updateCategoryName = (event: React.ChangeEvent<HTMLInputElement>): void => {
    changeAdminCard({
      isUpdating: adminCardState.isUpdating,
      isError: false,
      value: event.target.value,
    });
  };

  const changeCategory = (): void => {
    if (adminCardState.value.length > 0 && adminCardState.value.length < 20) {
      CategortyController.updateCategory(card.id, adminCardState.value).then((response) => {
        if (response === 200) {
          cancelCardForm();
          dispatch({
            type: CardAdminChangeTypes.UPDATE_ADMIN_CARD_STATE,
            payload: true,
          });
        } else {
          changeAdminCard({
            isUpdating: adminCardState.isUpdating,
            isError: true,
            value: adminCardState.value,
          });
        }
      });
    } else {
      changeAdminCard({
        isUpdating: adminCardState.isUpdating,
        isError: true,
        value: adminCardState.value,
      });
    }
  };

  const deletaCategory = ():void => {
    CategortyController.deleteCategory(card.id).then((response) => {
      if (response === 200) {
        dispatch({
          type: CardAdminChangeTypes.UPDATE_ADMIN_CARD_STATE,
          payload: true,
        });
      }
    });
  };

  return (
    (!adminCardState.isUpdating) ? (
      <div className="category-card" key={card.id}>
        <h2>{card.name}</h2>
        <div className="words-amount">{`WORDS: ${amountOfWordState}`}</div>
        <div className="change-buttons">
          <button className="category-btn" type="button" onClick={viewUpdateCardForm}>Update</button>
          <Link to={`/${card.name} ${card.id}`}><button className="category-btn" type="button">Add Word</button></Link>
        </div>
        <button className="delete-category" type="button" onClick={deletaCategory}>Delete</button>
      </div>
    ) : (
      <div className="category-card" key={card.id}>
        {(adminCardState.isError) && <span className="wrong-span">Wrong input</span>}
        <input type="text" value={adminCardState.value} onChange={updateCategoryName} />
        <div className="change-buttons">
          <button className="category-btn update cancel" type="button" onClick={cancelCardForm}>Cancel</button>
          <button className="category-btn update" type="button" onClick={changeCategory}>Create</button>
        </div>
      </div>
    )
  );
};

AdminCategoryCardComponent.propTypes = {
  card: PropTypes.exact({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};
