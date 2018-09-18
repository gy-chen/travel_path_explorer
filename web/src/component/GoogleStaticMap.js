import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

const GOOGLE_STATIC_MAP_API = 'https://maps.googleapis.com/maps/api/staticmap?';

const GoogleStaticMap = props => {
    const { size, path, key } = props;

    const src = GOOGLE_STATIC_MAP_API + qs.stringify({
        path: `enc:${path}`,
        key,
        size
    })

    return (
        <img src={src} />
    );
}

GoogleStaticMap.propTypes = {
    size: PropTypes.string,
    path: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
}

GoogleStaticMap.defaultProps = {
    size: '400x300',
}

export default GoogleStaticMap;