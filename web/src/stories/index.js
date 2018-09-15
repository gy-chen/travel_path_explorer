import React from 'react';

import { storiesOf } from '@storybook/react';

import Intro from '../component/Intro';
import Explore from '../component/Explore';
import Report from '../component/Report';
import GoogleMap from '../component/GoogleMap';


storiesOf('Intro', module)
  .add('Basic', () => <Intro />);

storiesOf('Explore', module)
  .add('Basic', () => <Explore />);

storiesOf('Report', module)
  .add('Basic', () => <Report />);

storiesOf('GoogleMap', module)
  .add('Basic', () => <GoogleMap />);