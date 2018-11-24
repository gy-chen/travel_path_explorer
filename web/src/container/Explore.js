import { connect } from "react-redux";
import Explore from "../component/Explore";
import { route, currentGeolocation } from "../action";

const mapStateToProps = state => ({
  currentError: state.route.currentError,
  currentRoute: state.route.currentRoute,
  currentGeolocation: state.currentGeolocation,
  isFetching: state.route.isFetching
});

const mapDispatchToProps = dispatch => ({
  onDirectionSelected: (origin, destination) =>
    dispatch(route.fetchRoute(origin, destination)),
  onSearchBoxPlacesChanged: places => {
    if (!places) {
      return;
    }
    const place = places[0];
    const newGeolocation = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    };
    dispatch(currentGeolocation.setCurrentGeolocation(newGeolocation));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Explore);
