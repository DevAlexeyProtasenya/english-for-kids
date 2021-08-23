export interface SortState {
  sort: SortFields;
  type: SortType
}

export enum SortReducerTypes{
  UPDATE_SORT = 'UPDATE_SORT',
}

export interface SortAction {
  type: string;
  payload: SortState;
}

export enum SortFields {
  CATEGORY,
  WORD,
  TRANSLATION,
  CLICKS,
  CORRECT,
  WRONG,
  ERRORS
}

export enum SortType {
  ASC,
  DESC
}
