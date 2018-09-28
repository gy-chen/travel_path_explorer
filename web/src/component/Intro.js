import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Intro page
 */
const Intro = () => (
    <div>
        <h1>Intro</h1>
        <Link to="/explore">start explore</Link>
    </div>
);

export default Intro;