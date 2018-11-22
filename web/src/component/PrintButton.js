import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from './mixin';
import { withLocalization } from 'fluent-react/compat';

const PrintButton = withLocalization(styled(Button).attrs({
    onClick: () => window.print
})`
    background-color: white;
    display: ${props => props.display ? 'block' : 'none'};
    
    &:after {
        content: '${props => props.getString('print', null, 'Print')}'
    }
`);

PrintButton.defaultProps = {
    display: true
};

PrintButton.propTypes = {
    display: PropTypes.bool
};

export default PrintButton;