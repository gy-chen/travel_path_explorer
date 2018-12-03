import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { Link, withRouter } from "react-router-dom";
import { Localized } from "fluent-react/compat";
import heroBackground from '../asset/hero_background.jpg';

const fade_slide_down = keyframes`
  from {
    opacity: 0;
    transform: translateY(-4rem);
  }

  to {
    opacity: 1;
    transform: none;
  }
`;

const Wrapper = styled.div`
  height: calc(100vh - 58px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;

  ::before {
    content: '';
    background-image: 
      linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,.8)), 
      url(${heroBackground});
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background-position: bottom;
    background-size: cover;
    animation: ${fade_slide_down} 4s cubic-bezier(.16,.85,.63,.81) forwards;
  }

  ::after {
    content: '';
    position: absolute;
    left: -5%;
    right: -5%;
    top: 90%;
    bottom: -50%;
    background-color: white;
    transform: rotateZ(-3deg);
    transform-origin: 0 0;
  }
`;


/**
 * Intro page
 */
const Intro = props => {
  const { match } = props;

  return (
    <Wrapper>
      <Localized id="start_explore">
        <Link to={`${match.url}/explore`}>start explore</Link>
      </Localized>
    </Wrapper>
  );
};

Intro.propTypes = {
  match: PropTypes.object
};

export default withRouter(Intro);
