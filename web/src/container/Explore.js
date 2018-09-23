import { connect } from 'react-redux';
import Explore from '../component/Explore';
import { route } from '../action';

const mapStateToProps = state => ({
    currentRoute: state.route.currentRoute,
    isFetching: state.route.isFetching
});

const mapDispatchToProps = {
    onDirectionSelected: (origin, destination) => route.fetchRoute(origin, destination)
};

export default connect(mapStateToProps, mapDispatchToProps)(Explore);