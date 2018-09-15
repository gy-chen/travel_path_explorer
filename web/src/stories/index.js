import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Intro from '../component/Intro';
import Explore from '../component/Explore';
import Report from '../component/Report';
import GoogleMap from '../component/GoogleMap';
import GoogleMapPlacePicker from '../component/GoogleMapPlacePicker';


storiesOf('Intro', module)
  .add('Basic', () => <Intro />);

storiesOf('Explore', module)
  .add('Basic', () => <Explore />);

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