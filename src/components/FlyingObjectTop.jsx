import React from 'react';
import PropTypes from 'prop-types';
import { pathFromBezierCurve } from '../utils/formulas';

const FlyingObjectTop = (props) => {
    const style ={
        fill: '#b6b6b6',
        stroke: '#7d7d7d'
    };

    const baseWidth = 20;
    const halfBase = 10;
    const height = 25;

    const cubicBezierCurve = {
        initialAxis: {
            x: props.position.x - baseWidth,
            y: props.position.y
        },
        initialControlPoint: {
            x: props.position.x - halfBase,
            y: props.position.y - height
        },
        endingControlPoint: {
            x: props.position.x + halfBase,
            y: props.position.y - height
        },
        endingAxis: {
            x: props.position.x + baseWidth,
            y: props.position.y
        }
    };

    return (
        <path
            style={style}
            d={pathFromBezierCurve(cubicBezierCurve)}
        />
    );
};

FlyingObjectTop.propTypes = {
    position: PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
    }).isRequired
};

export default FlyingObjectTop;