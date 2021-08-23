import {
  SortAction, SortFields, SortReducerTypes, SortState, SortType,
} from '../types/sortTypes';

const initialGameState = {
  sort: SortFields.CATEGORY,
  type: SortType.ASC,
};

export const sortRedycer = (
  state = initialGameState,
  action: SortAction,
): SortState => {
  switch (action.type) {
    case SortReducerTypes.UPDATE_SORT: return {
      sort: action.payload.sort,
      type: action.payload.type,
    };
    default: return state;
  }
};
