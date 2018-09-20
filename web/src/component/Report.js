import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GoogleStaticMap from './GoogleStaticMap';
import Step from './Step';
import Parking from './Parking';

const Wrapper = styled.div`
`;

/**
 * Generate travel path explore report
 * 
 * Display info:
 *   - overview
 *   - steps
 *   - parkings
 */
const Report = (props) => {
    const { overview, steps, parkings } = props;

    return (
        <Wrapper>
            <h2>Overview</h2>
            <GoogleStaticMap path={overview.polyline.points} />
            <h2>Steps</h2>
            {steps.map(step => (<Step
                overview_polyline={overview.polyline.points}
                {...step}
            />))}
            <h2>Parkings</h2>
            {parkings.map(parking => (<Parking {...parking} />))}
        </Wrapper>
    )
};

Report.propTypes = {
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
}

export default Report;