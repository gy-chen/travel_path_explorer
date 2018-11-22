import { connect } from 'react-redux';
import Navbar from '../component/Navbar';

const mapStateToProps = state => ({
    displayPrintButton: !!state.route.currentRoute
});

export default connect(mapStateToProps)(Navbar);