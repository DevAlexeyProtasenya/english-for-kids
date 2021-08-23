import { combineReducers } from 'redux';
import { AdminChangeCardStateRedycer } from './adminChangeCardsReducer';
import { changeAdminCardStateRedycer } from './CardAdminChangeReducer';
import { cardsGameRedycer } from './cardsGameReducer';
import { categoryReducer } from './categoryReducer';
import { clickCountRedycer } from './clickCountReducer';
import { gameRedycer } from './gameReducer';
import { loginModalRedycer } from './loginModalReducer';
import { playRedycer } from './playReducer';
import { sortRedycer } from './sortReducer';

export const rootReducer = combineReducers({
  playState: playRedycer,
  categoryState: categoryReducer,
  gameState: gameRedycer,
  cardsGameState: cardsGameRedycer,
  clickCountState: clickCountRedycer,
  sortState: sortRedycer,
  loginModalState: loginModalRedycer,
  changeAdminCardState: changeAdminCardStateRedycer,
  adminCardState: AdminChangeCardStateRedycer,
});

export type RootState = ReturnType<typeof rootReducer>
