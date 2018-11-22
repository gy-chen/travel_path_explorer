import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './mixin';

const PrintButton = styled(Button).attrs({
    onClick: () => window.print
})`
    background-color: white;
    display: ${props => props.display ? 'block' : 'none'};
    
    &:after {
        content: 'Print'
    }
`;

PrintButton.defaultProps = {
    display: true
};

PrintButton.propTypes = {
    display: PropTypes.bool
};

export default PrintButton;