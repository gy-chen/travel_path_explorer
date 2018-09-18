import React from 'react';
import PropTypes from 'prop-types';
import qs from 'qs';

const GOOGLE_STATIC_MAP_API = 'https://maps.googleapis.com/maps/api/staticmap?';

const GoogleStaticMap = props => {
    const { size, zoom, center, path, key_ } = props;

    const params = { size, key: key_ };

    if (path) {
        params['path'] = `enc:${path}`;
    } else if (center) {
        params['center'] = `${center['lat']},${center['lng']}`;
        params['zoom'] = zoom;
    }

    const src = GOOGLE_STATIC_MAP_API + qs.stringify(params);

    return (
        <img src={src} />
    );
}

GoogleStaticMap.propTypes = {
    size: PropTypes.string,
    path: PropTypes.string,
    center: PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
    }),
    zoom: PropTypes.number,
    key_: PropTypes.string.isRequired
}

GoogleStaticMap.defaultProps = {
    size: '400x300',
    zoom: 16
}

export default GoogleStaticMap;