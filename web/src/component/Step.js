import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import GoogleStaticMap from "./GoogleStaticMap";
import Image from './Image';

const Wrapper = styled.div`
  display: flex;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  margin-left: 8px;
  margin-right: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const Column = styled.div`
  flex: 0 0 33%;
  padding-left: 15px;
  padding-right: 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Instruction = styled.p``;

const Distance = styled.p``;

/**
 * Step
 *
 * Display:
 *   - instruction
 *   - distance
 *   - streetview image
 *   - overview
 */
const Step = props => {
  const {
    html_instructions,
    distance,
    location,
    image,
    overview_polyline
  } = props;

  return (
    <Wrapper>
      <Column>
        <Instruction dangerouslySetInnerHTML={{ __html: html_instructions }} />
        <Distance>{distance}</Distance>
      </Column>
      <Column>
        <GoogleStaticMap
          center={location}
          path={overview_polyline}
          markers={[location]}
          zoom={17}
        />
      </Column>
      <Column>
        <Image src={image} />
      </Column>
    </Wrapper>
  );
};

Step.propTypes = {
  html_instructions: PropTypes.string,
  distance: PropTypes.string,
  location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  }),
  overview_polyline: PropTypes.string,
  image: PropTypes.string
};

export default Step;
