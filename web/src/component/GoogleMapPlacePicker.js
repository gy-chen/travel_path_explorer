import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GoogleMap from './GoogleMap';

/**
 * GoogleMapPlacePicker
 * 
 * Let user pick a place on the map.
 * 
 * Properties of GoogleMap should works.
 * 
 * Additional properties:
 *   - onPickPlace(marker): called when user pick a place. Marker is google map Marker type.
 * 
 */
class GoogleMapPlacePicker extends Component {

    constructor(props) {
        super(props);

        this._gmap = React.createRef();
        this._pickedPlaces = [];
        this._mapLoaded = false;

        this.onMapLoaded = this.onMapLoaded.bind(this);
    }

    get map() {
        return this._gmap.current.map;
    }

    get google() {
        return this._gmap.current.google;
    }

    _removeMarkers() {
        // hide markers
        _.each(this._pickedPlaces, marker => {
            marker.setMap(null);
        });
    }

    onMapLoaded() {
        this._mapLoaded = true;
        if (!this._gmap.current) {
            return;
        }

        this.google.maps.event.addListener(this.map, 'click', event => {
            const marker = new this.google.maps.Marker({
                position: event.latLng,
                map: this.map
            });

            _.invoke(this.props, 'onPickPlace', marker);

            this._removeMarkers();
            this._pickedPlaces.push(marker);
        });
        
    }

    componentDidMount() {
        if (this._mapLoaded) {
            this.onMapLoaded();
        }
    }

    render() {
        const { ...options } = this.props;

        return (
            <GoogleMap
                ref={this._gmap}
                onLoaded={this.onMapLoaded}
                {...options} />
        );
    }
}

GoogleMapPlacePicker.propTypes = {
    onPickPlace: PropTypes.func
};

export default GoogleMapPlacePicker;