import { CategoryAction, CategoryState, CategoryTypes } from '../types/categoryReducerTypes';

const initReducerState = {
  category: 0,
};

export const categoryReducer = (
  state = initReducerState,
  action: CategoryAction,
): CategoryState => {
  switch (action.type) {
    case CategoryTypes.UPDATE_CATEGORY: return {
      category: action.payload,
    };
    default: return state;
  }
};
