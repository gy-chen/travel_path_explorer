import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import qs from 'qs';
import GoogleStaticMapKeyContext from './GoogleStaticMapKeyContext';

const GOOGLE_STATIC_MAP_API = 'https://maps.googleapis.com/maps/api/staticmap?';

const Image = styled.img`
    max-width: 100%;
    height: auto;
`;

// TODO support mark style
const toMarkersQueryString = markers => {
    const markersQueryString = _.chain(markers)
        .map(marker => `${marker.lat},${marker.lng}`)
        .join('|');
    return `|${markersQueryString}`;
}

const GoogleStaticMap = props => {
    const { size, zoom, center, path, key_, markers } = props;

    const params = { size, zoom, key: key_ };

    if (path) {
        params['path'] = `enc:${path}`;
    }
    if (center) {
        params['center'] = `${center['lat']},${center['lng']}`;
    }
    if (markers) {
        params['markers'] = toMarkersQueryString(markers);
    }

    const src = GOOGLE_STATIC_MAP_API + qs.stringify(params);

    return (
        <Image src={src} />
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
    markers: PropTypes.arrayOf(PropTypes.shape({
        position: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number
        })
    })),
    key_: PropTypes.string.isRequired
}

GoogleStaticMap.defaultProps = {
    size: '320x300'
}

const withGoogleStaticMapKey = Component => {

    const WithGoogleStaticMapKey = props => {

        return (
            <GoogleStaticMapKeyContext.Consumer>
                {key_ => (
                    <Component key_={key_} {...props} />
                )}
            </GoogleStaticMapKeyContext.Consumer>
        )
    };

    return WithGoogleStaticMapKey;
}

export default withGoogleStaticMapKey(GoogleStaticMap);