import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DirectionSelectWizard from './DirectionSelectWizard';
import Report from './Report';
import Error from './Error';

const Wrapper = styled.div`
`;

/**
 * Explore
 * 
 * Provide explore function:
 *   1. let user choose origin and destination
 *   2. display route from origin to destination
 */
class Explore extends Component {

    constructor(props) {
        super(props);

        this._renderCurrentRoute = this._renderCurrentRoute.bind(this);
        this._renderDirectionSelectWizard = this._renderDirectionSelectWizard.bind(this);
        this._renderError = this._renderError.bind(this);
    }

    _renderCurrentRoute() {
        const { currentRoute } = this.props;

        if (currentRoute) {
            return (<Report {...currentRoute} />)
        }
        return null;
    }

    _renderDirectionSelectWizard() {
        const { currentRoute, currentGeolocation, isFetching, onDirectionSelected, onSearchBoxPlacesChanged } = this.props;
        if (!currentRoute) {
            return (<DirectionSelectWizard
                center={currentGeolocation}
                zoom={8}
                isFetching={isFetching}
                onDirectionSelected={onDirectionSelected}
                enableSearchBox
                onSearchBoxPlacesChanged={onSearchBoxPlacesChanged} />)
        }
        return null;
    }

    _renderError() {
        const { currentError } = this.props;
        if (currentError) {
            return (<Error errorCode={currentError} />);
        }
        return null;
    }

    render() {

        return (
            <Wrapper>
                {this._renderCurrentRoute()}
                {this._renderDirectionSelectWizard()}
                {this._renderError()}
            </Wrapper>
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
    }),
    currentGeolocation: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.numbers
    }),
    currentError: PropTypes.string,
    onDirectionSelected: PropTypes.func,
    onSearchBoxPlacesChanged: PropTypes.func
}

Explore.defaultProps = {
    isFetching: false
}

export default Explore;