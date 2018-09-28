import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import load from 'load-script';
import GoogleMapKeyContext from './GoogleMapKeyContext';

const GOOGLE_MAP_API = 'https://maps.googleapis.com/maps/api/js';

const Wrapper = styled.div`
    position: relative;
    width: 100%;

    &::before {
        display: block;
        content: "";
        padding-top: 56.25%;
    }
`;

const Content = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
`;


class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this._mapRef = React.createRef();
        this.map = null;
        this.google = null;
    }

    componentDidMount() {
        const { apiKey, onLoaded, ...options } = this.props;

        const initMap = () => {
            this.map = new window.google.maps.Map(this._mapRef.current, options);
            this.google = window.google;
            _.invoke(this.props, 'onLoaded');
        }

        if (!window.google) {
            window.initMap = initMap;

            load(`${GOOGLE_MAP_API}?${apiKey ? `key=${apiKey}` : ''}&callback=initMap`);
        } else {
            initMap();
        }
    }

    render() {
        return (
            <Wrapper>
                <Content innerRef={this._mapRef} />
            </Wrapper>);
    }
}

GoogleMap.propTypes = {
    apiKey: PropTypes.string,
    onLoaded: PropTypes.func
}

export const withGoogleMapKeyContext = Component => {

    const WithGoogleMapKeyContext = props => {
        return (
            <GoogleMapKeyContext.Consumer>
                {key_ => <Component apiKey={key_} {...props} />}
            </GoogleMapKeyContext.Consumer>
        )
    }

    return WithGoogleMapKeyContext;
};

export const GoogleMapWithContext = withGoogleMapKeyContext(GoogleMap);

export default GoogleMapWithContext;