import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapPlacePicker from './GoogleMapPlacePicker';

const Card = styled.div`
    padding: 1.25rem;
    border: 1px solid rgba(0, 0, 0, .125);
`;

const Title = styled.h3`
    padding: 0;
    margin: 0;
    margin-bottom: .75rem;
    font-size: 1.25rem;
`;

const Description = styled.p`
    padding: 0;
    margin: 0;
    margin-bottom: .60rem;
    color: #212529;
`;

/**
 * Provide hint for user to select a palce
 * 
 * Display:
 *   - title
 *   - description
 *   - GoogmeMapPlacePicker
 *   - (optional) additional children diplaying in the bottom of the card
 */
class PlacePickerCard extends Component {

    render() {
        const { title, description, children, onPickPlace, mapOptions } = this.props;

        return (
            <Card>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <GoogleMapPlacePicker onPickPlace={onPickPlace} mapOptions={mapOptions} />
                {children}
            </Card>
        );
    }
}

PlacePickerCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPickPlace: PropTypes.func,
    mapOptions: PropTypes.object
};

export default PlacePickerCard;