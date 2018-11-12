import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import GoogleStaticMap from './GoogleStaticMap';
import Base64Image from './Base64Image';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    padding-top: .75rem;
    padding-bottom: .75rem;
    margin-left: 8px;
    margin-right: 8px;
    border-bottom: 1px solid #e0e0e0;
`;

const Column = styled.div`
    flex: 0 0 33%;
    box-sizing: border-box;
    margin-left: 4px;
    margin-right: 4px;
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
            <Column>
                <GoogleStaticMap
                    center={location}
                    markers={[location]}
                    zoom={16}
                />
            </Column>
            <Column>
                <Base64Image content={image} />
            </Column>
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