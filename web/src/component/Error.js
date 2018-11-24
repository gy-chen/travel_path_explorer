import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { STATUS_CODE } from "../service/explore";

export const ERROR_MESSAGE = {
  [STATUS_CODE.UNAVAILABLE]: "Server unavailable now. Try again later.",
  [STATUS_CODE.NOT_FOUND]: "No route found. Try different origin or destination"
};

const ErrorMessage = styled.p`
  margin: 0;
  color: #dc3545;
`;

/**
 * Error
 *
 * Display error message according to error code it received.
 *
 */
const Error = props => {
  return <ErrorMessage>{ERROR_MESSAGE[props.errorCode]}</ErrorMessage>;
};

Error.propTypes = {
  errorCode: PropTypes.string
};

export default Error;
