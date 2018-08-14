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
    const leaderboard = [
        {id: 'd4', maxScore: 82, name: 'Charles Babbage', picture: 'http://www.timelineindex.com/imagesThumb/255_1584.png'},
        {id: 'a1', maxScore: 235, name: 'Konrad Zuse', picture: 'https://3.bp.blogspot.com/-new25rlWNwo/U8MSEr_ZXhI/AAAAAAAAGRE/raJqSeYpYnU/s60-c/Heinrich+Focke.png'},
        {id: 'c3', maxScore: 99, name: 'Kurt Godel', picture: 'https://www.computerhope.com/cdn/people/kurt_godel.jpg'},
        {id: 'b2', maxScore: 129, name: 'J. Presper Eckert', picture: 'https://www.computerhope.com/cdn/people/allen_dumont.jpg'},
        {id: 'e5', maxScore:34, name: 'Robert Noyce', picture: 'https://dgalywyr863hv.cloudfront.net/pictures/clubs/21145/453306/2/medium.jpg'},
        {id: 'f6', maxScore: 153, name: 'Alan Turing', picture: 'https://cbsnews3.cbsistatic.com/hub/i/r/2011/02/19/33f579f5-a644-11e2-a3f0-029118418759/thumbnail/60x60/33b306e9baafb6ee4fdad431577cfca4/turing.jpg'},
        {id: 'g7', maxScore: 55, name: 'Steve Jobs', picture: 'https://cbsnews2.cbsistatic.com/hub/i/r/2011/10/06/957adcbf-a644-11e2-a3f0-029118418759/thumbnail/60x60/88a90eba2169e457b525af9efcda9fb0/frontstevejobs_1.jpg'},
        {id: 'h8', maxScore: 146, name: 'Bill Gates', picture: 'https://lh3.googleusercontent.com/-29JO1Z-O2RA/AAAAAAAAAAI/AAAAAAAAABg/AGwh8f0ULIg/s60-p-no-il/photo.jpg'}
    ];

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
                    <Leaderboard currentPlayer={leaderboard[6]} authenticate={signIn} leaderboard={leaderboard} />
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
    startGame: PropTypes.func.isRequired
};

export default Canvas;