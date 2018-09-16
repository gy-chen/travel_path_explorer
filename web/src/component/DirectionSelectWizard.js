import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Wizard, Steps, Step } from 'react-albus';
import PlacePickerCard from './PlacePickerCard';

const NextButton = styled.button`
`;

const DoneButton = styled.button`
`;

/**
 * DirectionSelectWizard
 * 
 * Let user select origin and destination, step by step.
 * 
 * Provide properties:
 *   - onDirectionSelected (origin, destination): callback called when user done selected 
 *     origin and destination.
 * 
 */
class DirectionSelectWizard extends Component {

    constructor(props) {
        super(props);

        this._renderSelectOriginStep = this._renderSelectOriginStep.bind(this);
        this._renderSelectOriginStepButton = this._renderSelectOriginStepButton.bind(this);
        this._onPickOrigin = this._onPickOrigin.bind(this);
        this._renderSelectDestinationStep = this._renderSelectDestinationStep.bind(this);
        this._renderSelectDestinationStepButton = this._renderSelectDestinationStepButton.bind(this);
        this._onPickDestination = this._onPickDestination.bind(this);
        this._onDoneSelection = this._onDoneSelection.bind(this);

        this.state = {
            selectedOrigin: null,
            selectedDestination: null
        };
    }

    _renderSelectOriginStep({ next }) {
        const { ...options } = this.props;

        return (
            <PlacePickerCard
                title="Select Origin"
                description="Please select origin."
                onPickPlace={this._onPickOrigin}
                {...options}>
                {this._renderSelectOriginStepButton(next)}
            </PlacePickerCard>
        );
    }

    _renderSelectOriginStepButton(next) {
        const { selectedOrigin } = this.state;

        const isUserSelectedOrigin = !!selectedOrigin;

        return (
            <NextButton
                disabled={!isUserSelectedOrigin}
                onClick={next}>
                Next
            </NextButton>
        );
    }

    _onPickOrigin(marker) {
        this.setState({
            selectedOrigin: marker
        });
    }

    _renderSelectDestinationStep() {
        const { ...options } = this.props;

        return (
            <PlacePickerCard
                title="Select Destination"
                description="Please select destination."
                onPickPlace={this._onPickDestination}
                {...options}>
                {this._renderSelectDestinationStepButton()}
            </PlacePickerCard>
        );
    }

    _renderSelectDestinationStepButton() {
        const isUserSelectedDestination = !!this.state.selectedDestination;

        return (
            <DoneButton
                disabled={!isUserSelectedDestination}
                onClick={this._onDoneSelection}>
                Done
            </DoneButton>
        );
    }

    _onPickDestination(marker) {
        this.setState({
            selectedDestination: marker
        });
    }

    _onDoneSelection() {
        const callbackArgs = _.map(
            [this.state.selectedOrigin, this.state.selectedDestination],
            ({ position }) => ({
                lat: position.lat(),
                lng: position.lng()
            })
        );


        _.invoke(
            this.props,
            'onDirectionSelected',
            ...callbackArgs
        );
    }

    render() {
        return (
            <Wizard>
                <Steps>
                    <Step
                        id="selectOrigin"
                        render={this._renderSelectOriginStep}
                    />
                    <Step
                        id="selectDestination"
                        render={this._renderSelectDestinationStep}
                    />
                </Steps>
            </Wizard>
        );
    }
}

DirectionSelectWizard.propTypes = {
    onDirectionSelected: PropTypes.func
}

export default DirectionSelectWizard;