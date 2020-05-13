import { GamePhase } from '../../constants';

import {
  clearRoom,
  endRound,
  getStatus,
  gotResponses,
  joinRoom,
  nextList,
  nextRound,
  resetDiceRoll,
  rollDice,
  roundEnded,
  roundScored,
  setGamePhase,
  setPlayers,
  setRound,
  startGame,
  startRound,
  timerFired,
} from '../../actions';


const gameState = {
  activePlayer: null,
  currentList: 0,
  endTime: -1,
  phase: GamePhase.NOT_STARTED,
  players: [],
  roll: null,
  responses: [],
  room: 'default',
  roundActive: false,
  roundsScored: 0,
  startTime: -1,
  timeLeft: -1,
  waitNextRound: false,
  waitRoundStart: false,
};

const game = (state = gameState, action = {}) => {
  switch (action.type) {
    case setPlayers.SUCCESS:
      return {
        ...state,
        activePlayer: action.payload.activePlayer,
        players: action.payload.players,
      };

    case joinRoom.SUCCESS:
      return {
        ...state,
        activePlayer: action.payload.activePlayer,
        currentList: action.payload.currentList,
        players: action.payload.players,
        room: action.payload.room,
      };

    case startGame.SUCCESS:
      return {
        ...state,
        activePlayer: action.payload.activePlayer,
        phase: GamePhase.ROLL,
      };

    case resetDiceRoll.SUCCESS:
    case rollDice.TRIGGER:
      return {
        ...state,
        roll: null,
      };

    case rollDice.SUCCESS:
      return {
        ...state,
        roll: action.payload.roll,
      };

    case startRound.SUCCESS:
      return {
        ...state,
        phase: GamePhase.LIST,
        roundActive: true,
      };

    case roundEnded.SUCCESS:
    case endRound.SUCCESS:
      return {
        ...state,
        endTime: -1,
        phase: GamePhase.VOTE,
        roundActive: false,
        startTime: -1,
        timeLeft: -1,
      };

    case timerFired.SUCCESS:
      return {
        ...state,
        endTime: action.payload.endTime,
        startTime: action.payload.startTime,
        timeLeft: action.payload.timeLeft,
      };

    case timerFired.RESET:
      return {
        ...state,
        endTime: gameState.endTime,
        startTime: gameState.startTime,
        timeLeft: gameState.timeLeft,
      };

    case nextList.TRIGGER:
      return {
        ...state,
        currentList: state.currentList + 1,
      };

    case roundScored.SUCCESS:
      return {
        ...state,
        players: action.payload.players,
        roundsScored: state.roundsScored + 1,
      };

    case nextRound.SUCCESS:
      return {
        ...state,
        activePlayer: action.payload.activePlayer,
        endTime: -1,
        phase: GamePhase.ROLL,
        players: action.payload.players,
        responses: [],
        roll: null,
        startTime: -1,
        timeLeft: -1,
      };

    case getStatus.SUCCESS:
      return {
        ...state,
        activePlayer: action.payload.activePlayer,
        players: action.payload.players,
        roll: action.payload.roll,
      };

    case setGamePhase.SUCCESS:
      return {
        ...state,
        activePlayer: action.payload.activePlayer,
        currentList: action.payload.currentList,
        phase: action.payload.phase,
        players: action.payload.players,
        roll: action.payload.roll,
      };

    case setRound.SUCCESS:
      return {
        ...state,
        currentList: action.payload.currentList,
      };

    case gotResponses.TRIGGER:
      return {
        ...state,
        responses: action.payload.responses,
      };

    case clearRoom.SUCCESS:
      return gameState;

    default:
      return state;
  }
};


export default game;
