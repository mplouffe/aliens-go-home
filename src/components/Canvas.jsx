import React from 'react';
import PropTypes from 'prop-types';
import { signIn } from 'auth0-web';

import Sky from './Sky';
import Ground from './Ground';
import CannonPipe from './CannonPipe';
import CannonBase from './CannonBase';
import CannonBall from './CannonBall';
import CurrentScore from './CurrentScore';
import FlyingObject from './FlyingObject';
import Heart from './Heart';
import StartGame from './StartGame';
import Title from './Title';
import Leaderboard from './Leaderboard';

const Canvas = (props) => {
    const gameHeight = 1200;

    const viewBox = [window.innerWidth / -2, 100 - gameHeight, window.innerWidth, gameHeight];
    return (
        <svg
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMidYMid"
            onMouseMove={props.trackMouse}
            viewBox={viewBox}
        >
            <defs>
                <filter id="shadow">
                    <feDropShadow dx="1" dy="1" stdDeviation="2" />
                </filter>
            </defs>
            <Sky />
            <Ground />
            <CannonPipe rotation={props.angle} />
            <CannonBase />
            <Heart position={{x: -300, y: 35 }} />
            <CannonBall position={{x: 0, y: -100 }} />
            <CurrentScore score={15} />
            {!props.gameState.started && 
                <g>
                    <StartGame onClick={() => props.startGame()} />
                    <Leaderboard currentPlayer={props.currentPlayer} authenticate={signIn} leaderboard={props.players} />
                    <Title />
                </g>
            }

            {props.gameState.started && 
                <g>
                    {props.gameState.flyingObjects.map(flyingObject => (
                        <FlyingObject
                            key={flyingObject.id}
                            position={flyingObject.position}
                        />
                    ))}
                </g>        
            }
        </svg>
    );
};

Canvas.propTypes = {
    angle: PropTypes.number.isRequired,
    trackMouse: PropTypes.func.isRequired,
    gameState: PropTypes.shape({
        started: PropTypes.bool.isRequired,
        kills: PropTypes.number.isRequired,
        lives: PropTypes.number.isRequired,
        flyingObjects: PropTypes.arrayOf(PropTypes.shape({
            position: PropTypes.shape({
                x: PropTypes.number.isRequired,
                y: PropTypes.number.isRequired
            }).isRequired,
            id: PropTypes.number.isRequired
        })).isRequired
    }).isRequired,
    startGame: PropTypes.func.isRequired,
    currentPlayer: PropTypes.shape({
        id: PropTypes.string.isRequred,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
    }),
    players: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        maxScore: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        picture: PropTypes.string.isRequired
    }))
};

Canvas.defaultProps = {
    currentPlayer: null,
    players: null
};

export default Canvas;