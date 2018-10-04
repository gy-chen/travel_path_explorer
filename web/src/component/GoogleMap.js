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

const SearchBox = styled.input`
    display: ${props => props.enableSearchBox ? 'inline-block' : 'none'};
`;


export class GoogleMap extends Component {

    constructor(props) {
        super(props);

        this._searchBoxRef = React.createRef();
        this._mapRef = React.createRef();
        this.searchBox = null;
        this.map = null;
        this.google = null;
        this._initSearchBox = this._initSearchBox.bind(this);
        this._onSearchBoxPlacesChanged = this._onSearchBoxPlacesChanged.bind(this);
    }

    componentDidMount() {
        const { apiKey, onLoaded, ...options } = this.props;

        const initMap = () => {
            this.map = new window.google.maps.Map(this._mapRef.current, options);
            this.google = window.google;
            this._initSearchBox();
            _.invoke(this.props, 'onLoaded');
        }

        if (!window.google) {
            window.initMap = initMap;

            load(`${GOOGLE_MAP_API}?${apiKey ? `key=${apiKey}` : ''}&callback=initMap&libraries=places`);
        } else {
            initMap();
        }
    }

    componentDidUpdate() {
        const { ...options } = this.props;
        if (this.map) {
            this.map.setOptions(options);
        }
    }

    _initSearchBox() {
        this.searchBox = new this.google.maps.places.SearchBox(this._searchBoxRef.current);
        this.searchBox.addListener('places_changed', this._onSearchBoxPlacesChanged);
        this.map.controls[window.google.maps.ControlPosition.TOP_LEFT].push(this._searchBoxRef.current);
    }

    _onSearchBoxPlacesChanged() {
        _.invoke(this.props, 'onSearchBoxPlacesChanged', this.searchBox.getPlaces());
    }

    render() {
        const { enableSearchBox } = this.props;

        return (
            <Wrapper>
                <SearchBox type="text" innerRef={this._searchBoxRef} enableSearchBox={enableSearchBox} />
                <Content innerRef={this._mapRef} />
            </Wrapper>);
    }
}

// TODO add mapOptions property to collection map options instead of speard map options into properties
GoogleMap.propTypes = {
    apiKey: PropTypes.string,
    onLoaded: PropTypes.func,
    enableSearchBox: PropTypes.bool,
    onSearcBoxPlacesChanged: PropTypes.func
}

export const withGoogleMapKeyContext = Component => {

    const WithGoogleMapKeyContext = React.forwardRef((props, ref) => {
        return (
            <GoogleMapKeyContext.Consumer>
                {key_ => <Component ref={ref} apiKey={key_} {...props} />}
            </GoogleMapKeyContext.Consumer>
        )
    });

    return WithGoogleMapKeyContext;
};

export const GoogleMapWithContext = withGoogleMapKeyContext(GoogleMap);

export default GoogleMapWithContext;