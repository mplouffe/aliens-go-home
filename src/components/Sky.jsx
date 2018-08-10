import React from 'react';
import { SKY_AND_GROUND_WIDTH } from '../utils/constants';

const Sky = () => {
    const skyStyle = {
        fill: '#30abef',
    };

    const gameHeight = 1200;
    return (
        <rect
            style={skyStyle}
            x={SKY_AND_GROUND_WIDTH / -2}
            y={100 - gameHeight}
            width={SKY_AND_GROUND_WIDTH}
            height={gameHeight}
        />
    );
};

export default Sky;