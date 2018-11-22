import React from 'react';
import { Button } from './mixin';

const PrintButton = () => <Button onClick={window.print}>Print</Button>;

export default PrintButton;