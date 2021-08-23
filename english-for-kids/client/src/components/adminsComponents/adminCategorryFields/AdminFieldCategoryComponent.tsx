import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Category } from '../../../common/entities/Category';
import { CategortyController } from '../../../controllers/categoryController';
import { UseTypeSelector } from '../../../hooks/useTypeSelector';
import { CardAdminChangeTypes } from '../../../redux/types/cardsAdminChangesdType';
import { AdminCategoryCardComponent } from '../adminCategoryCard/AdminCategoryCardComponent';
import './AdminFieldCategoryStyle.scss';

const AdminFieldCategoryComponent: React.FC = () => {
  const [categoriesState, changeCategoriesState] = useState({
    isLoad: true,
    categories: [],
  } as {
    isLoad: boolean,
    categories: Array<Category>
  });

  const [adminCardState, changeAdminCard] = useState({
    isUpdating: false,
    isError: false,
    value: '',
  });

  const updateCardState = UseTypeSelector((state) => state.changeAdminCardState);
  const dispatch = useDispatch();

  useEffect(() => {
    if (categoriesState.isLoad === true || updateCardState.changeAdminCardState) {
      CategortyController.getAllCategory().then((response) => {
        changeCategoriesState({
          isLoad: false,
          categories: response,
        });
        dispatch({
          type: CardAdminChangeTypes.UPDATE_ADMIN_CARD_STATE,
          payload: false,
        });
      });
    }
  });

  const addCategoryForm = (): void => {
    changeAdminCard({
      isUpdating: true,
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

  const cancelCardForm = (): void => {
    changeAdminCard({
      isUpdating: false,
      isError: false,
      value: '',
    });
  };

  const addCategory = (): void => {
    if (adminCardState.value.length > 0 && adminCardState.value.length < 20) {
      CategortyController.setCategory(adminCardState.value).then((response) => {
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

  if (categoriesState.isLoad) return <h2>Data is loading...</h2>;
  return (
    <div className="cards-field">
      {categoriesState.categories.map((category) => (
        <AdminCategoryCardComponent key={category.id} card={category} />
      ))}
      {
        (!adminCardState.isUpdating) ? (
          <div className="category-card">
            <h2>Creaete new Category</h2>
            <button type="button" className="create-category-btn" onClick={addCategoryForm}>Create</button>
          </div>
        ) : (
          <div className="category-card">
            {(adminCardState.isError) && <span className="wrong-span">Wrong input</span>}
            <input type="text" value={adminCardState.value} onChange={updateCategoryName} />
            <div className="change-buttons">
              <button className="category-btn update cancel" type="button" onClick={cancelCardForm}>Cancel</button>
              <button className="category-btn update" type="button" onClick={addCategory}>Create</button>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AdminFieldCategoryComponent;
