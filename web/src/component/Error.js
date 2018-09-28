import React from 'react';
import PropTypes from 'prop-types';
import { STATUS_CODE } from '../service/explore';

export const ERROR_MESSAGE = {
    [STATUS_CODE.UNAVAILABLE]: 'Server unavailable now. Try again later.',
    [STATUS_CODE.NOT_FOUND]: 'No route found. Try different origin or destination'
};

/**
 * Error
 * 
 * Display error message according to error code it received.
 * 
 */
const Error = props => {

    return (
        <p>{ERROR_MESSAGE[props.errorCode]}</p>
    );
}

Error.propTypes = {
    errorCode: PropTypes.string
}

export default Error;