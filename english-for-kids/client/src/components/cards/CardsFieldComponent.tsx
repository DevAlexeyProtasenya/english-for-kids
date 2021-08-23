import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import cards from '../../assets/cards.json';
import { CardComponent } from '../card/CardComponent';
import './CardsField.scss';
import { UseTypeSelector } from '../../hooks/useTypeSelector';
import { GameStates, GameTypes } from '../../redux/types/gameReducerTypes';
import { CardsGameTypes, GameCard } from '../../redux/types/cardsGameTypes';
import { CategoryTypes } from '../../redux/types/categoryReducerTypes';
import { changeStatistic, StatisticMethods } from '../../common/StatisticCommon';
import { CardController } from '../../controllers/cardController';
import { CardType } from '../../common/entities/Card';
import { CategortyController } from '../../controllers/categoryController';
import { Category } from '../../common/entities/Category';

const PATH = 'https://english-for-kids-alex-protas.herokuapp.com/';

const shuffleCards = (cards: Array<GameCard>): Array<GameCard> => {
  const shuffledCards = cards;
  for (let i = cards.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledCards[i], shuffledCards[j]] = [cards[j], cards[i]];
  }
  return shuffledCards;
};

const playAudio = (sound: string): void => {
  (new Audio(sound)).play();
};

let shuffledCards: Array<GameCard> = [];

export const CardsFieldComponent: React.FC = () => {
  const gameState = UseTypeSelector((state) => state.gameState);
  const playState = UseTypeSelector((state) => state.playState);
  const cardsGameState = UseTypeSelector((state) => state.cardsGameState);
  const cardsCategory = UseTypeSelector((state) => state.categoryState);
  const [gameCardState, changeGameCards] = useState({
    isLoad: true,
    lastCategory: -5,
    gameCards: [],
  } as {
    isLoad: boolean,
    lastCategory: number,
    gameCards: Array<CardType>,
  });

  const ERROR_SOUND = `${PATH}audio/error.mp3`;
  const SUCCESS_SOUND = `${PATH}audio/correct.mp3`;

  const successStar = `${PATH}img/star-win.svg`;
  const wrongStar = `${PATH}img/star.svg`;

  const dispatch = useDispatch();
  const changeGameState = (gameState: GameStates): void => {
    dispatch({
      type: GameTypes.UPDATE_GAME,
      payload: gameState,
    });
  };
  const changeCategoryState = (): void => {
    dispatch({
      type: CategoryTypes.UPDATE_CATEGORY,
      payload: 0,
    });
  };

  const changeCardsGameClick = (
    gameCards: Array<GameCard>,
    cardNumber: number,
    correctCards: Array<number>,
    userClicks: Array<{click: boolean, id: number}>,
  ): void => {
    dispatch({
      type: CardsGameTypes.UPDATE_CARD,
      payload: {
        gameCards,
        cardNumber,
        correctCards,
        userClicks,
      },
    });
  };
  const clearCardsGameClick = (): void => {
    dispatch({
      type: CardsGameTypes.CLEAR_CARDS,
      payload: {},
    });
  };

  useEffect(() => {
    if (gameCardState.isLoad === true) {
      CategortyController.getAllCategory().then((response: Array<Category>) => {
        const cards = response.map((category) => {
          const card: CardType = {
            id: category.id,
            idCategory: 0,
            word: category.name,
            translate: '',
            imageSRC: '',
            sound: '',
          };
          return card;
        });
        changeGameCards({
          isLoad: false,
          lastCategory: cardsCategory.category,
          gameCards: cards,
        });
      });
    } else if (cardsCategory.category !== gameCardState.lastCategory) {
      switch (cardsCategory.category) {
        case 0: {
          CategortyController.getAllCategory().then((response: Array<Category>) => {
            const cards = response.map((category) => {
              const card: CardType = {
                id: category.id,
                idCategory: 0,
                word: category.name,
                translate: '',
                imageSRC: '',
                sound: '',
              };
              return card;
            });
            changeGameCards({
              isLoad: false,
              lastCategory: cardsCategory.category,
              gameCards: cards,
            });
          });
          break;
        }
        default: {
          CardController.getCardByCategory(cardsCategory.category).then((response) => {
            changeGameCards({
              isLoad: false,
              lastCategory: cardsCategory.category,
              gameCards: response,
            });
          });
          break;
        }
      }
    }

    if (gameState.gameState === GameStates.PLAYING) {
      const audio = cardsGameState.gameCards[cardsGameState.cardNumber].sound;
      playAudio(audio);
    }
  });

  if (gameState.gameState === GameStates.ENDING) {
    if (cardsGameState.userClicks.length === 7) {
      playAudio(`${PATH}audio/success.mp3`);
    } else {
      playAudio(`${PATH}audio/failure.mp3`);
    }
    const timeout = setTimeout(() => {
      changeGameState(GameStates.DISABLED);
      changeCategoryState();
      clearCardsGameClick();
      clearTimeout(timeout);
    }, 3000);
  }

  const startGame = (gameCards: Array<GameCard>): void => {
    changeGameState(GameStates.PLAYING);
    shuffledCards = shuffleCards([...gameCards]);
    changeCardsGameClick(shuffledCards, 0, [], []);
  };

  const replayAudio = (): void => {
    playAudio(cardsGameState.gameCards[cardsGameState.cardNumber].sound);
  };

  const cardClickHandler = (card: GameCard): void => {
    if (card.id === cardsGameState.gameCards[cardsGameState.cardNumber].id) {
      playAudio(SUCCESS_SOUND);
      changeStatistic(card.id, StatisticMethods.ADD_CORRECT);
      if (cardsGameState.cardNumber !== cardsGameState.gameCards.length - 1) {
        changeCardsGameClick(
          cardsGameState.gameCards,
          cardsGameState.cardNumber + 1,
          cardsGameState.correctCards.concat([card.id]),
          cardsGameState.userClicks.concat([{
            click: true,
            id: cardsGameState.userClicks.length,
          }]),
        );
      } else {
        changeGameState(GameStates.ENDING);
      }
    } else {
      playAudio(ERROR_SOUND);
      changeStatistic(card.id, StatisticMethods.ADD_WRONG);
      changeCardsGameClick(
        cardsGameState.gameCards,
        cardsGameState.cardNumber,
        cardsGameState.correctCards,
        cardsGameState.userClicks.concat([{ click: false, id: cardsGameState.userClicks.length }]),
      );
    }
  };
  const gameCards = cardsCategory.category !== -1
    ? gameCardState.gameCards
    : cards.filter((card) => (JSON.parse(localStorage.getItem('wrongCards')!) as Array<Number>)
      .includes(card.id));

  return (
    <div>
      <div className="stars">
        {cardsGameState.userClicks.map((click) => (click.click
          ? <img src={successStar} alt="Correct click" key={click.id} />
          : <img src={wrongStar} alt="Wrong click" key={click.id} />))}
      </div>
      <div className="cards-field">
        {
          gameCards.map((card) => (
            <a
              className="a-wrapper"
              href="/"
              key={card.id}
              onClick={(gameState.gameState === GameStates.PLAYING
                && !cardsGameState.correctCards.includes(card.id))
                ? (e) => {
                  e.preventDefault();
                  cardClickHandler(card);
                } : (e) => { e.preventDefault(); }}
            >
              <CardComponent card={card} />
              {cardsGameState.correctCards.includes(card.id)
              && gameState.gameState === GameStates.PLAYING
              && (
                <div className="completed-card" />
              )}
            </a>
          ))
        }
      </div>
      <div className="button-start-wrapper">
        {
          (playState.playState && gameCardState.lastCategory !== 0 && gameCards.length !== 0) && (
            (!gameState.gameState)
              ? (
                <button
                  type="button"
                  className="start-game"
                  onClick={() => startGame(gameCards)}
                >
                  Start game
                </button>
              )
              : (
                <button
                  type="button"
                  className="repeat-audio"
                  onClick={() => replayAudio()}
                >
                  repeat
                </button>
              )
          )
        }
      </div>
      {gameState.gameState === GameStates.ENDING && (
        <div className="game-end">
          {cardsGameState.userClicks.length === 7
            ? (<img src={`${PATH}img/success.jpg`} alt="End" />)
            : (<img src={`${PATH}img/failure.jpg`} alt="End" />)}
        </div>
      )}
    </div>
  );
};
