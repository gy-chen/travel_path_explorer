import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Intro from '../component/Intro';
import Report from '../component/Report';
import GoogleMap from '../component/GoogleMap';
import GoogleMapPlacePicker from '../component/GoogleMapPlacePicker';
import PlacePickerCard from '../component/PlacePickerCard';
import DirectionSelectWizard from '../component/DirectionSelectWizard';
import Step from '../component/Step';
import Parking from '../component/Parking';
import GoogleStaticMap from '../component/GoogleStaticMap';

import { withRouteData } from './moc/withRouteData';


storiesOf('Intro', module)
  .add('Basic', () => <Intro />);

storiesOf('Report', module)
  .add('Basic', () => {

    const ReportWithData = withRouteData(Report);

    return (<ReportWithData />);
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

    return (<StepWithData />);
  });

storiesOf('Parking', module)
  .add('Basic', () => {

    const ParkingWithData = withRouteData(props => {
      const { parkings } = props;

      return (<Parking {...parkings[0]} />)
    });

    return (<ParkingWithData />);
  });

storiesOf('GoogleStaticMap', module)
  .add('Path', () => <GoogleStaticMap
    path="knirCqpr_V?uA@a@BaAEcBiAoDSo@a@oAIQEQI_@o@RwAV}AV_@Jg@@eEGeDEeCCAT{AE}@CeCKU`IUxGCf@`@H"
    key_={process.env.STORYBOOK_GMAPS_API_KEY}
  />)
  .add('Center', () => <GoogleStaticMap 
    center={{"lat": 24.138877, "lng": 120.6895124}}
    key_={process.env.STORYBOOK_GMAPS_API_KEY}
  />);