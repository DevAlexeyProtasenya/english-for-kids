export interface CategoryState {
  category: number;
}

export enum CategoryTypes{
  UPDATE_CATEGORY = 'UPDATE_CATEGORY',
}

export interface CategoryAction {
  type: string;
  payload: number;
}
