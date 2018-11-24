import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Wizard, Steps, Step } from "react-albus";
import { Localized, withLocalization } from "fluent-react/compat";
import { Button } from "./mixin";
import PlacePickerCard from "./PlacePickerCard";
import Error from "./Error";

const Wrapper = styled.div`
  margin-top: 1.25rem;

  @media (min-width: 768px) {
    width: 736px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StepAdditionalContentWrapper = styled.div`
  margin-top: 0.6rem;
`;

const NextButton = styled(Button)``;

const DoneButton = styled(Button)``;

const ErrorWrapper = styled.div`
  margin-top: 0.6rem;
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
    this._renderSelectOriginStepButton = this._renderSelectOriginStepButton.bind(
      this
    );
    this._onPickOrigin = this._onPickOrigin.bind(this);
    this._renderSelectDestinationStep = this._renderSelectDestinationStep.bind(
      this
    );
    this._renderSelectDestinationStepButton = this._renderSelectDestinationStepButton.bind(
      this
    );
    this._onPickDestination = this._onPickDestination.bind(this);
    this._onDoneSelection = this._onDoneSelection.bind(this);
    this._renderError = this._renderError.bind(this);

    this.state = {
      selectedOrigin: null,
      selectedDestination: null
    };
  }

  _renderSelectOriginStep({ next }) {
    const { getString, mapOptions } = this.props;

    return (
      <PlacePickerCard
        title={getString("select_origin", null, "Select Origin")}
        description={getString(
          "please_select_origin",
          null,
          "Please select origin"
        )}
        onPickPlace={this._onPickOrigin}
        mapOptions={mapOptions}
      >
        {this._renderStepButton(() => this._renderSelectOriginStepButton(next))}
      </PlacePickerCard>
    );
  }

  _renderStepButton(render) {
    const { isFetching } = this.props;

    if (isFetching) {
      return (
        <Localized id="loading">
          <Loading>loading...</Loading>
        </Localized>
      );
    }

    return render();
  }

  _renderSelectOriginStepButton(next) {
    const { selectedOrigin } = this.state;

    const isUserSelectedOrigin = !!selectedOrigin;

    return (
      <StepAdditionalContentWrapper>
        <Localized id="next">
          <NextButton disabled={!isUserSelectedOrigin} onClick={next}>
            Next
          </NextButton>
        </Localized>
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
    const { getString, mapOptions } = this.props;

    return (
      <PlacePickerCard
        title={getString("select_destination", null, "Select Destination")}
        description={getString(
          "please_select_destination",
          null,
          "Please select destination."
        )}
        onPickPlace={this._onPickDestination}
        mapOptions={mapOptions}
      >
        {this._renderStepButton(() =>
          this._renderSelectDestinationStepButton()
        )}
      </PlacePickerCard>
    );
  }

  _renderSelectDestinationStepButton() {
    const isUserSelectedDestination = !!this.state.selectedDestination;

    return (
      <StepAdditionalContentWrapper>
        <Localized id="done">
          <DoneButton
            disabled={!isUserSelectedDestination}
            onClick={this._onDoneSelection}
          >
            Done
          </DoneButton>
        </Localized>
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

    _.invoke(this.props, "onDirectionSelected", ...callbackArgs);
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
            <Step id="selectOrigin" render={this._renderSelectOriginStep} />
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
  getString: PropTypes.func.isRequired,
  onDirectionSelected: PropTypes.func,
  isFetching: PropTypes.bool,
  errorCode: PropTypes.string,
  mapOptions: PropTypes.object
};

export default withLocalization(DirectionSelectWizard);
