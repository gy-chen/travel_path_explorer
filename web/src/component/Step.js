import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleStaticMap from './GoogleStaticMap';
import Base64Image from './Base64Image';

const Wrapper = styled.div`
`;

const Instruction = styled.p`
`;

const Distance = styled.p`
`;

/**
 * Step
 * 
 * Display:
 *   - instruction
 *   - distance
 *   - streetview image
 *   - overview
 */
const Step = props => {
    const {
        html_instructions,
        distance,
        location,
        image
    } = props;

    return (
        <Wrapper>
            <Instruction dangerouslySetInnerHTML={{ __html: html_instructions }} />
            <Distance>{distance}</Distance>
            <GoogleStaticMap center={location} />
            <Base64Image content={image} />
        </Wrapper>
    );
};

Step.propTypes = {
    html_instructions: PropTypes.string,
    distance: PropTypes.string,
    location: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    image: PropTypes.string
}

export default Step;