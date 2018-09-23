import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import DirectionSelectWizard from './DirectionSelectWizard';
import Report from './Report';

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
    }

    _renderCurrentRoute() {
        const { currentRoute } = this.props;

        if (currentRoute) {
            return (<Report {...currentRoute} />)
        }
        return null;
    }

    _renderDirectionSelectWizard() {
        const { currentRoute, isFetching, onDirectionSelected } = this.props;

        if (!currentRoute) {
            // TODO improve google map component to initialize with guessed center
            return (<DirectionSelectWizard
                center={{ lat: -34.397, lng: 150.644 }}
                zoom={8}
                isFetching={isFetching}
                onDirectionSelected={onDirectionSelected} />)
        }
        return null;
    }

    render() {

        return (
            <Wrapper>
                {this._renderCurrentRoute()}
                {this._renderDirectionSelectWizard()}
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
    onDirectionSelected: PropTypes.func
}

Explore.defaultProps = {
    isFetching: false
}

export default Explore;