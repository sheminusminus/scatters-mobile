import { createSelector } from 'reselect';

import listItems from './lists';


const getPlayerState = state => state.player;
const getGameState = state => state.game;
const getModalState = state => state.modal;
const getRoundState = state => state.round;

export const getPlayerName = createSelector(
  [getPlayerState],
  player => player.name,
);

export const getPlayerId = createSelector(
  [getPlayerState],
  player => player.id,
);

export const getPlayerScore = createSelector(
  [getPlayerState],
  player => player.score,
);

export const getPlayerLookedForName = createSelector(
  [getPlayerState],
  player => player.lookedForName,
);

export const getGameActivePlayer = createSelector(
  [getGameState],
  game => game.activePlayer,
);

export const getPlayerIsActive = createSelector(
  [getPlayerId, getGameActivePlayer],
  (playerId, activePlayer) => playerId === activePlayer,
);

export const getGamePlayers = createSelector(
  [getGameState],
  game => game.players,
);

export const getGameActivePlayerName = createSelector(
  [getGamePlayers, getGameActivePlayer],
  (players, activePlayer) => {
    const p = players.find(p => p.id === activePlayer);

    if (p) {
      return p.username;
    }

    return '';
  },
);

export const getGamePlayersNotWaiting = createSelector(
  [getGameState],
  game => game.players.filter((p) => !p.waiting),
);

export const getGameRoom = createSelector(
  [getGameState],
  game => game.room,
);

export const getGameRoll = createSelector(
  [getGameState],
  game => game.roll,
);

export const getGameTimeLeft = createSelector(
  [getGameState],
  game => game.timeLeft,
);

export const getGameStartTime = createSelector(
  [getGameState],
  game => game.startTime,
);

export const getGameEndTime = createSelector(
  [getGameState],
  game => game.endTime,
);

export const getGameTimeElapsed = createSelector(
  [getGameStartTime, getGameEndTime, getGameTimeLeft],
  (start, end, left) => {
    if (start === -1 || end === -1) {
      return -1;
    }

    return (end - start) - left;
  },
);

export const getGameRoundActive = createSelector(
  [getGameState],
  game => game.roundActive,
);

export const getGameRoundsScored = createSelector(
  [getGameState],
  game => game.roundsScored,
);

export const getGameCurrentList = createSelector(
  [getGameState],
  game => game.currentList,
);

export const getGameWaitNextRound = createSelector(
  [getGameState],
  game => game.waitNextRound,
);

export const getGameWaitRoundStart = createSelector(
  [getGameState],
  game => game.waitRoundStart,
);

export const getGamePhase = createSelector(
  [getGameState],
  game => game.phase,
);

export const getGameListItems = createSelector(
  [getGameCurrentList],
  (currentList) => {
    return listItems.slice(currentList * 12, (currentList + 1) * 12);
  },
)

export const getModalIsOpen = createSelector(
  [getModalState],
  modal => modal.isOpen,
);

export const getModalResponses = createSelector(
  [getModalState],
  modal => modal.responses,
);

export const getRoundAllowAnswers = createSelector(
  [getRoundState],
  round => round.allowAnswers,
);

export const getRoundHideList = createSelector(
  [getRoundState],
  round => round.hideList,
);

export const getRoundShowTimer = createSelector(
  [getRoundState],
  round => round.showTimer,
);

export const getRoundAnswers = createSelector(
  [getRoundState],
  round => round.answers,
);
