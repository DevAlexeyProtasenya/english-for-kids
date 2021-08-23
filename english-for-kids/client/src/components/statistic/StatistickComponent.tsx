import React from 'react';
import { useDispatch } from 'react-redux';
import cards from '../../assets/cards.json';
import category from '../../assets/categories.json';
import { CardType } from '../../common/entities/Card';
import { clearStatistic, getErrorPersent, getStatData } from '../../common/StatisticCommon';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { CategoryTypes } from '../../redux/types/categoryReducerTypes';
import { SortFields, SortReducerTypes, SortType } from '../../redux/types/sortTypes';
import './StatisticksStyles.scss';

export const StatisticsComponent: React.FC = () => {
  const statistic = getStatData();
  const playState = UseTypeSelector((state) => state.playState);
  const sortState = UseTypeSelector((state) => state.sortState);
  const dispatch = useDispatch();
  const categoryUpdate = (category: number): void => {
    dispatch({
      type: CategoryTypes.UPDATE_CATEGORY,
      payload: category,
    });
  };
  const changeSortState = (fieldSort: SortFields, typeSort: SortType): void => {
    dispatch({
      type: SortReducerTypes.UPDATE_SORT,
      payload: {
        sort: fieldSort,
        type: typeSort,
      },
    });
  };

  const resetStat = (): void => {
    clearStatistic();
    categoryUpdate(0);
  };

  const sortComparator = (a: CardType, b: CardType): number => {
    const firstStateCard = statistic.find((elem) => elem.cardID === a.id);
    const secondStateCard = statistic.find((elem) => elem.cardID === b.id);
    switch (sortState.sort) {
      case SortFields.CATEGORY: {
        const firstCategory = category
          .find((category) => category.id === a.idCategory)!.name;
        const seccondCategory = category
          .find((category) => category.id === b.idCategory)!.name;
        if (sortState.type === SortType.ASC) {
          return firstCategory > seccondCategory ? -1 : 1;
        }
        return firstCategory < seccondCategory ? -1 : 1;
      }
      case SortFields.WORD: {
        if (sortState.type === SortType.ASC) {
          return a.word > b.word ? -1 : 1;
        }
        return a.word < b.word ? -1 : 1;
      }
      case SortFields.TRANSLATION: {
        if (sortState.type === SortType.ASC) {
          return a.translate > b.translate ? -1 : 1;
        }
        return a.translate < b.translate ? -1 : 1;
      }
      case SortFields.CLICKS: {
        if (sortState.type === SortType.ASC) {
          return firstStateCard!.clicks - secondStateCard!.clicks;
        }
        return secondStateCard!.clicks - firstStateCard!.clicks;
      }
      case SortFields.CORRECT: {
        if (sortState.type === SortType.ASC) {
          return firstStateCard!.correct - secondStateCard!.correct;
        }
        return secondStateCard!.correct - firstStateCard!.correct;
      }
      case SortFields.WRONG: {
        if (sortState.type === SortType.ASC) {
          return firstStateCard!.wrong - secondStateCard!.wrong;
        }
        return secondStateCard!.wrong - firstStateCard!.wrong;
      }
      case SortFields.ERRORS: {
        if (sortState.type === SortType.ASC) {
          return getErrorPersent(firstStateCard) - getErrorPersent(secondStateCard);
        }
        return getErrorPersent(secondStateCard) - getErrorPersent(firstStateCard);
      }
      default: {
        const firstCategory = category
          .find((category) => category.id === a.idCategory)!.name;
        const seccondCategory = category
          .find((category) => category.id === b.idCategory)!.name;
        if (sortState.type === SortType.ASC) {
          return firstCategory > seccondCategory ? -1 : 1;
        }
        return firstCategory < seccondCategory ? -1 : 1;
      }
    }
  };

  const difficultsWords = (): void => {
    const wrongsCardId = statistic
      .sort((a, b) => getErrorPersent(b) - getErrorPersent(a))
      .slice(0, 8).map((card) => card.cardID);
    localStorage.setItem('wrongCards', JSON.stringify(wrongsCardId));
    categoryUpdate(-1);
  };

  return (
    <div>
      <div className="stat-buttons">
        <button className="reset-button" type="button" onClick={resetStat}>Reset</button>
        <button className="difficult-words" type="button" onClick={difficultsWords}>Repeat difficult words</button>
      </div>
      <table className={playState.playState ? 'play' : 'train'}>
        <thead>
          <tr>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.CATEGORY, SortType.DESC)
                  : () => changeSortState(SortFields.CATEGORY, SortType.ASC)
                }
              >
                Category
              </button>
            </td>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.WORD, SortType.DESC)
                  : () => changeSortState(SortFields.WORD, SortType.ASC)
                }
              >
                Word
              </button>
            </td>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.TRANSLATION, SortType.DESC)
                  : () => changeSortState(SortFields.TRANSLATION, SortType.ASC)
                }
              >
                Translation
              </button>
            </td>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.CLICKS, SortType.DESC)
                  : () => changeSortState(SortFields.CLICKS, SortType.ASC)
                }
              >
                Clicks
              </button>
            </td>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.CORRECT, SortType.DESC)
                  : () => changeSortState(SortFields.CORRECT, SortType.ASC)
                }
              >
                Correct
              </button>
            </td>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.WRONG, SortType.DESC)
                  : () => changeSortState(SortFields.WRONG, SortType.ASC)
                }
              >
                Wrong
              </button>
            </td>
            <td>
              <button
                className="header-button"
                type="button"
                onClick={
                sortState.type === SortType.ASC
                  ? () => changeSortState(SortFields.ERRORS, SortType.DESC)
                  : () => changeSortState(SortFields.ERRORS, SortType.ASC)
                }
              >
                % errors
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {cards.filter((card) => card.idCategory !== 1).sort(sortComparator).map((card) => (
            <tr key={card.id}>
              <td>{category.find((category) => category.id === card.idCategory)?.name}</td>
              <td>{card.word}</td>
              <td>{card.translate}</td>
              <td>{statistic.find((elem) => elem.cardID === card.id)?.clicks}</td>
              <td>{statistic.find((elem) => elem.cardID === card.id)?.correct}</td>
              <td>{statistic.find((elem) => elem.cardID === card.id)?.wrong}</td>
              <td>{getErrorPersent(statistic.find((elem) => elem.cardID === card.id))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
