import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import GoogleStaticMap from './GoogleStaticMap';
import Step from './Step';
import Parking from './Parking';


const Wrapper = styled.div`
    @media screen {
        display: flex;
        justify-content: center;
        background-color: #e0e0e0;
        padding-top: 32px;
        padding-bottom: 32px;
    }
`;

const ContentWrapper = styled.div`
    width: 210mm;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: white;

    @media screen {
        box-shadow: 0 .5mm 2mm rgba(0,0,0,.3);
    }
`;

const Title = styled.h2`
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
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
            <ContentWrapper>
                <Title>Overview</Title>
                <GoogleStaticMap path={overview.polyline.points} />
                <Title>Steps</Title>
                {steps.map((step, index) => (<Step
                    key={index}
                    overview_polyline={overview.polyline.points}
                    {...step}
                />))}
                <Title>Parkings</Title>
                {parkings.map((parking, index) => (<Parking key={index} {...parking} />))}
            </ContentWrapper>
        </Wrapper>
    )
};

Report.propTypes = {
    overview: PropTypes.shape({
        polyline: PropTypes.shape({
            points: PropTypes.string
        })
    }),
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