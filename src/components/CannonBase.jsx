import React from 'react';
import { pathFromBezierCurve } from '../utils/formulas';

const CannonBase = (props) => {
    const cannonBaseStyle = {
        fill: '#a16012',
        stroke: '#75450e',
        strokeWidth: '2px'
    };

    const base = 80;
    const halfBase = 40;
    const height = 40;
    const negativeHeight = height * -1;

    const cubicBezierCurve = {
        initialAxis: {
            x: -halfBase,
            y: height
        },
        initialControlPoint: {
            x: -10,
            y: negativeHeight
        },
        endingControlPoint: {
            x: 10,
            y: negativeHeight
        },
        endingAxis: {
            x: halfBase,
            y: height
        }
    };

    return (
        <g>
            <path
                style={cannonBaseStyle}
                d={pathFromBezierCurve(cubicBezierCurve)}
            />
            <line
                x1={-halfBase}
                y1={height}
                x2={halfBase}
                y2={height}
                style={cannonBaseStyle}
            />
        </g>
    );
};

export default CannonBase;