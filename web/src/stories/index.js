import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import App from '../App';
import Intro from '../component/Intro';
import Report from '../component/Report';
import Explore from '../component/Explore';
import Error from '../component/Error';
import GoogleMap from '../component/GoogleMap';
import GoogleMapKeyContext from '../component/GoogleMapKeyContext';
import GoogleMapPlacePicker from '../component/GoogleMapPlacePicker';
import PlacePickerCard from '../component/PlacePickerCard';
import DirectionSelectWizard from '../component/DirectionSelectWizard';
import Step from '../component/Step';
import Parking from '../component/Parking';
import GoogleStaticMap from '../component/GoogleStaticMap';
import GoogleStaticMapKeyContext from '../component/GoogleStaticMapKeyContext';
import { configureStore } from '../store';
import { route, currentGeolocation } from '../action';
import ExploreContainer from '../container/Explore';
import CenteredGoogleMap from '../container/CenteredGoogleMap';

import { explore as exploreApi, geolocation as geolocationApi } from '../service';

import { withRouteData } from './moc/withRouteData';


storiesOf('App', module)
  .add('Basic', () => {
    const store = configureStore();

    return (
      <Provider store={store}>
        <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
          <GoogleMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
            <App />
          </GoogleMapKeyContext.Provider>
        </GoogleStaticMapKeyContext.Provider>
      </Provider>
    );
  });

storiesOf('Intro', module)
  .add('Basic', () => (
    <Router>
      <Intro />
    </Router>
  ));

storiesOf('Report', module)
  .add('Basic', () => {

    const ReportWithData = withRouteData(Report);

    return (
      <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
        <ReportWithData />
      </GoogleStaticMapKeyContext.Provider>
    );
  });

storiesOf('Explore', module)
  .add('Basic', () => <Explore />)
  .add('isFetching', () => <Explore isFetching={true} />)
  .add('Error: Service Unavailable', () => <Explore currentError={exploreApi.STATUS_CODE.UNAVAILABLE} />)
  .add('Error: Not Found', () => <Explore currentError={exploreApi.STATUS_CODE.NOT_FOUND} />)
  .add('Fetched', () => {
    const ExploreWithRouteData = withRouteData(props => {
      const { overview, steps, parkings } = props;

      return (<Explore currentRoute={{ overview, steps, parkings }} />);
    })

    return (
      <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
        <ExploreWithRouteData />
      </GoogleStaticMapKeyContext.Provider>
    );
  })
  .add('Container', () => {
    const DevTools = createDevTools(<LogMonitor />);

    const Wrapper = styled.div`
      position: absolute;
      display: flex;
      flex-direction: row;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    `;

    const Column = styled.div`
      flex: 1;
    `;

    const store = configureStore(DevTools.instrument());

    return (
      <Provider store={store}>
        <Wrapper>
          <Column>
            <ExploreContainer />
          </Column>
          <Column>
            <DevTools />
          </Column>
        </Wrapper>
      </Provider>
    );
  });

storiesOf('Error', module)
  .add('Unavailable', () => <Error errorCode={exploreApi.STATUS_CODE.UNAVAILABLE} />)
  .add('Not found', () => <Error errorCode={exploreApi.STATUS_CODE.NOT_FOUND} />);

storiesOf('GoogleMap', module)
  .add('Basic', () => <GoogleMap
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8} />)
  .add('SearchBox', () => <GoogleMap
    enableSearchBox
    onSearchBoxPlacesChanged={action('onSearchBoxPlacesChanged')}
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8} />)
  .add('Centered', () => {
    const store = configureStore();

    store.dispatch(currentGeolocation.fetchCurrentGeolocation());

    return (
      <Provider store={store}>
        <CenteredGoogleMap zoom={8} />
      </Provider>
    );
  });

storiesOf('GoogleMapPlacePicker', module)
  .add('Basic', () => <GoogleMapPlacePicker
    onPickPlace={action('onPickPlace')}
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8} />)

storiesOf('PlacePickerCard', module)
  .add('Basic', () => <PlacePickerCard
    title="PlacePickerCard"
    description="Please select a place."
    onPickPlace={action('onPickPlace')}
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8}
  />)

storiesOf('DirectionSelectWizard', module)
  .add('Basic', () => <DirectionSelectWizard
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8}
    onDirectionSelected={action('onDirectionSelected')}
  />)
  .add('Error: Service Unavailable', () => <DirectionSelectWizard
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8}
    errorCode={exploreApi.STATUS_CODE.UNAVAILABLE}
  />)
  .add('Error: Not Found', () => <DirectionSelectWizard
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8}
    errorCode={exploreApi.STATUS_CODE.NOT_FOUND}
  />);

storiesOf('Step', module)
  .add('Basic', () => {

    const StepWithData = withRouteData(props => {
      const { steps } = props;

      return (<Step {...steps[0]} />);
    });

    return (
      <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
        <StepWithData />
      </GoogleStaticMapKeyContext.Provider>
    );
  });

storiesOf('Parking', module)
  .add('Basic', () => {

    const ParkingWithData = withRouteData(props => {
      const { parkings } = props;

      return (
        <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
          <Parking {...parkings[0]} />
        </GoogleStaticMapKeyContext.Provider>
      );
    });

    return (<ParkingWithData />);
  });

storiesOf('GoogleStaticMap', module)
  .add('Path', () => (
    <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
      <GoogleStaticMap
        path="knirCqpr_V?uA@a@BaAEcBiAoDSo@a@oAIQEQI_@o@RwAV}AV_@Jg@@eEGeDEeCCAT{AE}@CeCKU`IUxGCf@`@H"
      />
    </GoogleStaticMapKeyContext.Provider>)
  )
  .add('Center', () => (
    <GoogleStaticMapKeyContext.Provider value={process.env.STORYBOOK_GMAPS_API_KEY}>
      <GoogleStaticMap
        center={{ "lat": 24.138877, "lng": 120.6895124 }}
      />
    </GoogleStaticMapKeyContext.Provider>)
  );

storiesOf('Redux State', module)
  .add('Basic', () => {
    const DevTools = createDevTools(<LogMonitor />);

    const store = configureStore(DevTools.instrument());

    const Wrapper = styled.div`
      display: flex;
      flex-direction: row;
      align-items: stretch;
      height: 600px;
    `;

    const ButtonWrapper = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const ReduxStateDemoWithRouteData = withRouteData(props => {

      const { ...routeData } = props;

      return (
        <Provider store={store}>
          <Wrapper>
            <ButtonWrapper>
              <button
                onClick={() => store.dispatch(route.fetchRoute('Taichung Train Station', 'Taichung Park'))}>
                Fetch Route Action
              </button>
              <button
                onClick={() => store.dispatch(route.requestRoute())}>
                Request Route Action
              </button>
              <button
                onClick={() => store.dispatch(route.receiveRoute(routeData))}>
                Receive Route Action
              </button>
              <button onClick={() => store.dispatch(route.receiveError('NOT_FOUND'))}>
                Receive Error Action
              </button>
              <button onClick={() => store.dispatch(currentGeolocation.fetchCurrentGeolocation())}>
                Fetch Current Geolocation Action
              </button>
              <button onClick={() => store.dispatch(currentGeolocation.setCurrentGeolocation({ lat: 23, lng: 121 }))}>
                Set Current Geolocation Acition
              </button>
            </ButtonWrapper>
            <DevTools />
          </Wrapper>
        </Provider>
      );
    });

    return (<ReduxStateDemoWithRouteData />);
  });

storiesOf('Service', module)
  .add('Explore', () => {

    const Wrapper = styled.div`
    `;

    const FormFieldWrapper = styled.div`
    `;

    const ApiResult = styled.pre`
    `;

    class ExploreStory extends React.Component {

      constructor(props) {
        super(props);

        this.onExplore = this.onExplore.bind(this);

        this.state = {
          origin: '',
          destination: '',
          apiResult: ''
        };
      }

      onExplore() {
        exploreApi.findRoute(this.state.origin, this.state.destination)
          .then(response => {
            this.setState({
              apiResult: JSON.stringify(response, null, 2)
            });
          });
      }

      render() {
        return (
          <Wrapper>
            <FormFieldWrapper>
              <label>
                Origin:
                <input
                  type="text"
                  onChange={evt => this.setState({ origin: evt.target.value })}
                  value={this.state.origin}
                />
              </label>
            </FormFieldWrapper>
            <FormFieldWrapper>
              <label>
                Destination:
                <input
                  type="text"
                  onChange={evt => this.setState({ destination: evt.target.value })}
                  value={this.state.destination}
                />
              </label>
            </FormFieldWrapper>
            <FormFieldWrapper>
              <button onClick={this.onExplore}>Explore</button>
            </FormFieldWrapper>
            <ApiResult>
              {this.state.apiResult}
            </ApiResult>
          </Wrapper>
        );
      }
    }

    return (<ExploreStory />);
  })
  .add('Geolocation', () => {

    class GeolocationStory extends React.Component {

      constructor(props) {
        super(props);

        this.state = {
          apiResult: ''
        };

        this._onGetCurrentGeolocationClick = this._onGetCurrentGeolocationClick.bind(this);
      }

      _onGetCurrentGeolocationClick() {
        geolocationApi.getGeolocation().then(res => {
          this.setState({
            apiResult: JSON.stringify(res, null, 2)
          });
        });
      }

      render() {
        return (
          <div>
            <button onClick={this._onGetCurrentGeolocationClick}>Get Current Geolocation</button>
            <pre>
              {this.state.apiResult}
            </pre>
          </div>
        )
      }
    }

    return <GeolocationStory />;
  });