import { createSelector } from 'reselect';

import listItems from './lists';


const getPlayerState = state => state.player;
const getGameState = state => state.game;
const getRoundState = state => state.round;

export const getPlayerName = createSelector(
  [getPlayerState],
  player => player.username,
);

export const getPlayerScore = createSelector(
  [getPlayerState],
  player => player.score,
);

export const getPlayerRooms = createSelector(
  [getPlayerState],
  player => player.rooms,
);

export const getPlayerLookedForName = createSelector(
  [getPlayerState],
  player => player.lookedForName,
);

export const getPlayerDefaultRoomAvailable = createSelector(
  [getPlayerState],
  player => player.defaultRoomAvailable,
);

export const getGameActivePlayer = createSelector(
  [getGameState],
  game => game.activePlayer,
);

export const getPlayerIsActive = createSelector(
  [getPlayerName, getGameActivePlayer],
  (username, activePlayer) => username === activePlayer,
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

export const getGameResponses = createSelector(
  [getGameState],
  game => game.responses,
);

export const getGameListItems = createSelector(
  [getGameCurrentList],
  (currentList) => {
    return listItems.slice(currentList * 12, (currentList + 1) * 12);
  },
)

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
