import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import styled from 'styled-components';
import { createDevTools } from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import { Provider } from 'react-redux';

import Intro from '../component/Intro';
import Report from '../component/Report';
import Explore from '../component/Explore';
import GoogleMap from '../component/GoogleMap';
import GoogleMapPlacePicker from '../component/GoogleMapPlacePicker';
import PlacePickerCard from '../component/PlacePickerCard';
import DirectionSelectWizard from '../component/DirectionSelectWizard';
import Step from '../component/Step';
import Parking from '../component/Parking';
import GoogleStaticMap from '../component/GoogleStaticMap';
import GoogleStaticMapKeyContext from '../component/GoogleStaticMapKeyContext';
import { configureStore } from '../store';
import { route } from '../action';
import ExploreContainer from '../container/Explore';

import { withRouteData } from './moc/withRouteData';


storiesOf('Intro', module)
  .add('Basic', () => <Intro />);

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


storiesOf('GoogleMap', module)
  .add('Basic', () => <GoogleMap
    center={{ lat: -34.397, lng: 150.644 }}
    zoom={8} />);

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
            </ButtonWrapper>
            <DevTools />
          </Wrapper>
        </Provider>
      );
    });

    return (<ReduxStateDemoWithRouteData />);
  });