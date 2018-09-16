import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Intro from '../component/Intro';
import Report from '../component/Report';
import GoogleMap from '../component/GoogleMap';
import GoogleMapPlacePicker from '../component/GoogleMapPlacePicker';
import PlacePickerCard from '../component/PlacePickerCard';
import DirectionSelectWizard from '../component/DirectionSelectWizard';


storiesOf('Intro', module)
  .add('Basic', () => <Intro />);

storiesOf('Report', module)
  .add('Basic', () => <Report />);

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