import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { Localized } from 'fluent-react/compat';

const Wrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
`;

/**
 * Intro page
 */
const Intro = props => {
    const { match } = props;

    return (
        <Wrapper>
            <Content>
                <h1>Intro</h1>
                <Localized id="start_explore">
                    <Link to={`${match.url}/explore`}>start explore</Link>
                </Localized>
            </Content>
        </Wrapper >
    );
};

Intro.propTypes = {
    match: PropTypes.object
};

export default withRouter(Intro);