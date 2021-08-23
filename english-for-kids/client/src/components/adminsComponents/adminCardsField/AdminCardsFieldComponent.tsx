import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CardType } from '../../../common/entities/Card';
import { CardController } from '../../../controllers/cardController';
import { UseTypeSelector } from '../../../hooks/useTypeSelector';
import { AdminCardComponent } from '../adminCard/AdminCardComponent';

type QuizParams = {
  category: string;
};

const AdminCardsFieldComponent: React.FC = () => {
  const [categoriesState, changeCategoriesState] = useState({
    isLoad: true,
    categories: [],
  } as {
    isLoad: boolean,
    categories: Array<CardType>
  });
  const { category } = useParams<QuizParams>();

  const updateCardState = UseTypeSelector((state) => state.adminCardState);

  useEffect(() => {
    if (categoriesState.isLoad === true || updateCardState.adminCardsState) {
      const regexCategory = category.match(/\d*$/);
      let idCategory = 0;
      if (regexCategory) {
        idCategory = parseInt(regexCategory.toString(), 10);
      }
      CardController.getCardByCategory(idCategory).then((response) => {
        changeCategoriesState({
          isLoad: false,
          categories: response,
        });
      });
    }
  });

  return (
    <div className="cards-field">
      {categoriesState.categories.map((category) => (
        <AdminCardComponent key={category.id} card={category} />
      ))}
    </div>
  );
};

export default AdminCardsFieldComponent;
