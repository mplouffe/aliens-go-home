import {
    MOVE_OBJECTS, SHOOT, START_GAME,
    LEADERBOARD_LOADED, LOGGED_IN
} from '../actions';
import moveObjects from './moveObjects';
import startGame from './startGame';
import shoot from './shoot';

const initialGameState = {
    started: false,
    kills: 0,
    lives: 3,
    flyingObjects: [],
    lastObjectCreatedAt: new Date(),
    currentPlayer: null,
    players: null,
    cannonBalls: []
};

const initialState = {
    angle: 45,
    gameState: initialGameState
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case MOVE_OBJECTS:
            return moveObjects(state, action);
        case START_GAME:
            return startGame(state, initialGameState);
        case LEADERBOARD_LOADED:
            return {
                ...state,
                players: action.players
            };
        case LOGGED_IN:
            return {
                ...state,
                currentPlayer: action.player
            };
        case SHOOT:
            return shoot(state, action);
        default:
            return state;
    }
}

export default reducer;