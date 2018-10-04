import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import GoogleMapPlacePicker from './GoogleMapPlacePicker';

const Card = styled.div`
`;

const Title = styled.h3`
`;

const Description = styled.p`
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
        const { title, description, children, ...options } = this.props;

        return (
            <Card>
                <Title>{title}</Title>
                <Description>{description}</Description>
                <GoogleMapPlacePicker {...options} />
                {children}
            </Card>
        );
    }
}

// TODO add map options properties
PlacePickerCard.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    onPickPlace: PropTypes.func,
};

export default PlacePickerCard;