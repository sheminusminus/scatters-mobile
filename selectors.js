/* noinspection JSUnresolvedVariable */
import { createSelector } from 'reselect';

import listItems from './lists';


const getState = state => state;
const getPlayerState = state => state.player;
const getGameState = state => state.game;
const getRoomsState = state => state.rooms;
const getRoundState = state => state.round;
const getSystemState = state => state.system;
const getChatsState = state => state.chats;


export const getAllState = createSelector(
  [getState],
  state => state,
);

export const getRecordingPermission = createSelector(
  [getSystemState],
  system => system.recordingPerm,
);

export const getCanRecord = createSelector(
  [getRecordingPermission],
  perm => perm === 'granted',
);

export const getUsername = createSelector(
  [getPlayerState],
  player => player.username,
);

export const getScore = createSelector(
  [getPlayerState],
  player => player.score,
);

export const getLookedForName = createSelector(
  [getPlayerState],
  player => player.lookedForName,
);

export const getActivePlayer = createSelector(
  [getGameState],
  game => game.activePlayer,
);

export const getPlayerIsActive = createSelector(
  [getUsername, getActivePlayer],
  (username, activePlayer) => username === activePlayer,
);

export const getPlayers = createSelector(
  [getGameState],
  game => game.players,
);

export const getActivePlayerUsername = createSelector(
  [getPlayers, getActivePlayer],
  (players, activePlayer) => {
    const p = players.find(p => p.username === activePlayer);

    if (p) {
      return p.username;
    }

    return '';
  },
);

export const getPlayersNotWaiting = createSelector(
  [getGameState],
  game => game.players.filter((p) => !p.waiting),
);

export const getRoll = createSelector(
  [getGameState],
  game => game.roll,
);

export const getTimeLeft = createSelector(
  [getGameState],
  game => game.timeLeft,
);

export const getTimerStart = createSelector(
  [getGameState],
  game => game.startTime,
);

export const getTimerEnd = createSelector(
  [getGameState],
  game => game.endTime,
);

export const getTimerElapsedTime = createSelector(
  [getTimerStart, getTimerEnd, getTimeLeft],
  (start, end, left) => {
    if (start === -1 || end === -1) {
      return -1;
    }

    return (end - start) - left;
  },
);

export const getActiveRound = createSelector(
  [getGameState],
  game => game.roundActive,
);

export const getRoundsScored = createSelector(
  [getGameState],
  game => game.roundsScored,
);

export const getCurrentList = createSelector(
  [getGameState],
  game => game.currentList,
);

export const getGamePhase = createSelector(
  [getGameState],
  game => game.phase,
);

export const getResponses = createSelector(
  [getGameState],
  game => game.responses,
);

export const getListItems = createSelector(
  [getCurrentList],
  (currentList) => {
    return listItems.slice(currentList * 12, (currentList + 1) * 12);
  },
)

export const getAnsweringIsAllowed = createSelector(
  [getRoundState],
  round => round.allowAnswers,
);

export const getShouldHideList = createSelector(
  [getRoundState],
  round => round.hideList,
);

export const getShouldShowTimer = createSelector(
  [getRoundState],
  round => round.showTimer,
);

export const getAnswers = createSelector(
  [getRoundState],
  round => round.answers,
);

export const getActiveRoom = createSelector(
  [getRoomsState],
  rooms => rooms.room,
);

export const getJoinedRooms = createSelector(
  [getRoomsState],
  rooms => rooms.joinedRooms,
);

export const getJoinedRoomNames = createSelector(
  [getJoinedRooms],
  joinedRooms => joinedRooms ? joinedRooms.map((room) => room.name) : [],
);

export const getAllRooms = createSelector(
  [getRoomsState],
  rooms => rooms.allRooms,
);

export const getAllRoomNames = createSelector(
  [getAllRooms],
  allRooms => (allRooms ? allRooms.map((room) => room.name) : []),
);

export const getAllPlayers = createSelector(
  [getRoomsState],
  rooms => rooms.allPlayers,
);

export const getOnlinePlayers = createSelector(
  [getRoomsState],
  rooms => rooms.onlinePlayers,
);

export const getChats = createSelector(
  [getChatsState],
  chats => chats.chats,
);

export const getActiveChat = createSelector(
  [getChatsState],
  chats => chats.activeChat,
);

export const getChatMessages = createSelector(
  [getChatsState],
  chats => chats.chatMessages,
);

export const getMessagesForActiveChat = createSelector(
  [getActiveChat, getChatMessages],
  (chat, messages) => messages[chat] || [],
);

