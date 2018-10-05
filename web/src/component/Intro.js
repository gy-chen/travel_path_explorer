import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled.div`
    height: 100vh;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
`;

// TODO add navbar
/**
 * Intro page
 */
const Intro = () => (
    <Wrapper>
        <Content>
            <h1>Intro</h1>
            <Link to="/explore">start explore</Link>
        </Content>
    </Wrapper>
);

export default Intro;