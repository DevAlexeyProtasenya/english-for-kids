import cards from '../assets/cards.json';

export interface Statistic {
  cardID: number;
  clicks: number;
  correct: number;
  wrong: number;
}

export const initStat = (): Array<Statistic> => cards
  .filter((card) => card.id > 8)
  .map((card) => {
    const stat: Statistic = {
      cardID: card.id,
      clicks: 0,
      correct: 0,
      wrong: 0,
    };
    return stat;
  });

export const getStatData = (): Array<Statistic> => {
  const statistic = localStorage.getItem('cards');
  let newStatistic: Array<Statistic>;
  if (statistic) {
    newStatistic = JSON.parse(statistic) as Array<Statistic>;
  } else {
    newStatistic = initStat();
    localStorage.setItem('cards', JSON.stringify(newStatistic));
  }
  return newStatistic;
};

export const getErrorPersent = (stat: Statistic | undefined): number => {
  if (stat) {
    if (stat.correct === 0 && stat.wrong === 0) {
      return 0;
    }
    if (stat.correct === 0) {
      return 100;
    }
    if (stat.wrong === 0) {
      return 0;
    }
    return Math.round((stat.wrong / (stat.correct + stat.wrong)) * 100 * 100) / 100;
  }
  return 0;
};

export enum StatisticMethods{
  ADD_CLICK,
  ADD_CORRECT,
  ADD_WRONG
}

export const changeStatistic = (cardID: number, methode: StatisticMethods): void => {
  const statistic = getStatData();
  const newStat = JSON.stringify(statistic.map((card) => {
    const newCard = card;
    if (card.cardID === cardID) {
      switch (methode) {
        case StatisticMethods.ADD_CLICK: newCard.clicks++; break;
        case StatisticMethods.ADD_CORRECT: newCard.correct++; break;
        case StatisticMethods.ADD_WRONG: newCard.wrong++; break;
        default: break;
      }
    }
    return newCard;
  }));
  localStorage.setItem('cards', newStat);
};

export const clearStatistic = (): void => {
  const newStatistic = initStat();
  localStorage.setItem('cards', JSON.stringify(newStatistic));
};
