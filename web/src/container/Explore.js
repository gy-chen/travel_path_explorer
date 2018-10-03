import { connect } from 'react-redux';
import Explore from '../component/Explore';
import { route } from '../action';

const mapStateToProps = state => ({
    currentError: state.route.currentError,
    currentRoute: state.route.currentRoute,
    currentGeolocation: state.currentGeolocation,
    isFetching: state.route.isFetching
});

const mapDispatchToProps = {
    onDirectionSelected: (origin, destination) => route.fetchRoute(origin, destination)
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);