import React, { Component } from 'react';
import PropTypes from 'prop-types';

/**
 * Explore
 * 
 * Provide explore function:
 *   1. let user choose origin and destination
 *   2. display route from origin to destination
 */
class Explore extends Component {

    render() {
        return (
            <p>Explore</p>
        );
    }
}

Explore.propTypes = {
    isFetching: PropTypes.bool,
    currentRoute: PropTypes.shape({
        overview: PropTypes.arrayOf(PropTypes.shape({
            polyline: PropTypes.shape({
                points: PropTypes.string
            })
        })),
        steps: PropTypes.arrayOf(PropTypes.shape({
            html_instructions: PropTypes.string,
            distance: PropTypes.string,
            location: PropTypes.shape({
                lat: PropTypes.number,
                lng: PropTypes.number
            }),
            image: PropTypes.string
        })),
        parking: PropTypes.arrayOf(PropTypes.shape({
            location: PropTypes.shape({
                lat: PropTypes.number,
                lng: PropTypes.number
            }),
            image: PropTypes.string
        }))
    })
}

Explore.defaultProps = {
    isFetching: false
}

export default Explore;