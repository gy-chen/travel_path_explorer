import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Wizard, Steps, Step } from 'react-albus';
import PlacePickerCard from './PlacePickerCard';
import Error from './Error';

const Wrapper = styled.div`

    @media (min-width: 768px) {
        width: 736px;
        margin-left: auto;
        margin-right: auto;
    }
`;

const StepAdditionalContentWrapper = styled.div`
    margin-top: .60rem;
`;

const NextButton = styled.button`
    padding: .375rem .75rem;
    background-color: transparent;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 500;
`;

const DoneButton = styled(NextButton)``;

const ErrorWrapper = styled.div`
    margin-top: .60rem;
`;

const Loading = styled.p``;


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

        this._renderStepButton = this._renderStepButton.bind(this);
        this._renderSelectOriginStep = this._renderSelectOriginStep.bind(this);
        this._renderSelectOriginStepButton = this._renderSelectOriginStepButton.bind(this);
        this._onPickOrigin = this._onPickOrigin.bind(this);
        this._renderSelectDestinationStep = this._renderSelectDestinationStep.bind(this);
        this._renderSelectDestinationStepButton = this._renderSelectDestinationStepButton.bind(this);
        this._onPickDestination = this._onPickDestination.bind(this);
        this._onDoneSelection = this._onDoneSelection.bind(this);
        this._renderError = this._renderError.bind(this);

        this.state = {
            selectedOrigin: null,
            selectedDestination: null
        };
    }

    _renderSelectOriginStep({ next }) {
        const { mapOptions } = this.props;

        return (
            <PlacePickerCard
                title="Select Origin"
                description="Please select origin."
                onPickPlace={this._onPickOrigin}
                mapOptions={mapOptions}>
                {this._renderStepButton(() => this._renderSelectOriginStepButton(next))}
            </PlacePickerCard>
        );
    }

    _renderStepButton(render) {
        const { isFetching } = this.props;

        if (isFetching) {
            return (<Loading>loading...</Loading>);
        }

        return render();
    }

    _renderSelectOriginStepButton(next) {
        const { selectedOrigin } = this.state;

        const isUserSelectedOrigin = !!selectedOrigin;

        return (
            <StepAdditionalContentWrapper>
                <NextButton
                    disabled={!isUserSelectedOrigin}
                    onClick={next}>
                    Next
                </NextButton>
                {this._renderError()}
            </StepAdditionalContentWrapper>
        );
    }

    _onPickOrigin(marker) {
        this.setState({
            selectedOrigin: marker
        });
    }

    _renderSelectDestinationStep() {
        const { mapOptions } = this.props;

        return (
            <PlacePickerCard
                title="Select Destination"
                description="Please select destination."
                onPickPlace={this._onPickDestination}
                mapOptions={mapOptions}>
                {this._renderStepButton(() => this._renderSelectDestinationStepButton())}
            </PlacePickerCard>
        );
    }

    _renderSelectDestinationStepButton() {
        const isUserSelectedDestination = !!this.state.selectedDestination;

        return (
            <StepAdditionalContentWrapper>
                <DoneButton
                    disabled={!isUserSelectedDestination}
                    onClick={this._onDoneSelection}>
                    Done
                </DoneButton>
                {this._renderError()}
            </StepAdditionalContentWrapper>
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

    _renderError() {
        const { errorCode } = this.props;
        if (errorCode) {
            return (
                <ErrorWrapper>
                    <Error errorCode={errorCode} />
                </ErrorWrapper>
            );
        }
        return null;
    }

    render() {
        return (
            <Wrapper>
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
            </Wrapper>
        );
    }
}

DirectionSelectWizard.propTypes = {
    onDirectionSelected: PropTypes.func,
    isFetching: PropTypes.bool,
    errorCode: PropTypes.string,
    mapOptions: PropTypes.object
}

export default DirectionSelectWizard;