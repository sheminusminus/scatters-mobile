import * as types from './types';

export const makeActions = (ACTION) => {
  const TRIGGER = `${ACTION}_TRIGGER`;
  const REQUEST = `${ACTION}_REQUEST`;
  const SUCCESS = `${ACTION}_SUCCESS`;
  const FAILURE = `${ACTION}_FAILURE`;
  const FULFILL = `${ACTION}_FULFILL`;
  const RESET = `${ACTION}_RESET`;

  return {
    TRIGGER,
    REQUEST,
    SUCCESS,
    FAILURE,
    RESET,
    trigger: (payload, meta = undefined) => ({
      type: TRIGGER,
      payload,
      meta,
    }),
    request: (payload, meta = undefined) => ({
      type: REQUEST,
      payload,
      meta,
    }),
    success: (payload, meta = undefined) => ({
      type: SUCCESS,
      payload,
      meta,
    }),
    failure: (error, meta = undefined) => ({
      type: FAILURE,
      error,
      meta,
    }),
    fulfill: (payload, meta = undefined) => ({
      type: FULFILL,
      payload,
      meta,
    }),
    reset: () => ({
      type: RESET,
    }),
  };
};

export const clearRoom = makeActions(types.CLEAR_ROOM);
export const createRoom = makeActions(types.CREATE_ROOM);

export const emitName = makeActions(types.EMIT_NAME);
export const endRound = makeActions(types.END_ROUND);
export const getStatus = makeActions(types.GET_STATUS);
export const gotResponses = makeActions(types.GOT_RESPONSES);
export const gotRooms = makeActions(types.GOT_ROOMS);
export const joinRoom = makeActions(types.JOIN_ROOM);
export const nextList = makeActions(types.NEXT_LIST);
export const nextRound = makeActions(types.NEXT_ROUND);
export const requestListRooms = makeActions(types.REQUEST_LIST_ROOMS);
export const requestRoom = makeActions(types.REQUEST_ROOM);
export const resetDiceRoll = makeActions(types.RESET_DICE_ROLL);
export const retrieveName = makeActions(types.RETRIEVE_NAME);
export const rollDice = makeActions(types.ROLL_DICE);
export const roundEnded = makeActions(types.ROUND_ENDED);
export const roundScored = makeActions(types.ROUND_SCORED);
export const sendAnswers = makeActions(types.SEND_ANSWERS);
export const sendTallies = makeActions(types.SEND_TALLIES);
export const setGamePhase = makeActions(types.SET_GAME_PHASE);
export const setPlayers = makeActions(types.SET_PLAYERS);
export const setRound = makeActions(types.SET_ROUND);
export const startGame = makeActions(types.START_GAME);
export const startRound = makeActions(types.START_ROUND);
export const timerFired = makeActions(types.TIMER_FIRED);


export const roundAllowAnswers = makeActions(types.ROUND_ALLOW_ANSWERS);
export const roundHideList = makeActions(types.ROUND_HIDE_LIST);
export const roundSetAnswers = makeActions(types.ROUND_SET_ANSWERS);
export const roundShowTimer = makeActions(types.ROUND_SHOW_TIMER);

export const requestAllUsers = makeActions(types.PRESENCE_GET_ALL_USERS);
export const requestOnlineUsers = makeActions(types.PRESENCE_GET_ONLINE_USERS);

export const requestInvitesToMe = makeActions(types.INVITES_GET_TO_ME);
export const requestInvitesFromMe = makeActions(types.INVITES_GET_FROM_ME);
export const sendInviteForRoom = makeActions(types.INVITES_SEND_FOR_ROOM);

export const onConnect = makeActions(types.ON_CONNECT);
export const onDisconnect = makeActions(types.ON_DISCONNECT);

export const permsRequestRecording = makeActions(types.PERMS_REQUEST_RECORDING);
export const permsCheckRecording = makeActions(types.PERMS_CHECK_RECORDING);
export const audioStartRecording = makeActions(types.AUDIO_START_REC);

export const sendPushNotif = makeActions(types.SEND_PUSH_NOTIF);
export const acceptRoomInvite = makeActions(types.ACCEPT_ROOM_INVITE);
export const declineRoomInvite = makeActions(types.DECLINE_ROOM_INVITE);
export const setPushToken = makeActions(types.SET_PUSH_TOKEN);

export const showAlertMessage = makeActions(types.SHOW_ALERT_MESSAGE);

export const activateChat = makeActions(types.ACTIVATE_CHAT);
export const sendChatMessage = makeActions(types.SEND_CHAT_MESSAGE);
export const chatMessageReceived = makeActions(types.CHAT_MESSAGE_RECEIVED);
export const getChatMessages = makeActions(types.GET_CHAT_MESSAGES);
export const clearChat = makeActions(types.CLEAR_CHAT);
