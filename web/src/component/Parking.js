import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GoogleStaticMap from './GoogleStaticMap';
import Base64Image from './Base64Image';

const Wrapper = styled.div`
`;

/**
 * Parking
 * 
 * display parking information:
 *   - location on the map
 *   - streetview image
 */
const Parking = props => {
    const { location, image } = props;

    return (
        <Wrapper>
            <GoogleStaticMap
                center={location}
            />
            <Base64Image content={image} />
        </Wrapper>
    );
};

Parking.propTypes = {
    location: PropTypes.shape({
        lat: PropTypes.number,
        lnt: PropTypes.number
    }),
    image: PropTypes.string
}

export default Parking;