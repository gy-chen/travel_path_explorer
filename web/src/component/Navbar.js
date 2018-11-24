import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Github } from "styled-icons/fa-brands/Github";
import PrintButton from "./PrintButton";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 1rem 0.5rem;

  flex-shrink: 0;
  flex-grow: 0;

  @media print {
    display: none;
  }
`;

const Brand = styled.h5`
  padding: 0 0.5rem;
  margin: 0;
  font-weight: 600;
  font-size: 1.25rem;
`;

const Nav = styled.ol`
  padding: 0;
  margin: 0;
  list-style: none;

  display: flex;
  align-items: center;
`;

const NavItem = styled.li`
  padding: 0 0.5rem;
  color: rgba(0, 0, 0, 0.5);
`;

const NavLink = styled.a`
  text-decoration: none;
  color: rgba(0, 0, 0, 0.5);

  &:hover {
    color: rgba(0, 0, 0, 0.7);
  }
`;

class Navbar extends Component {
  constructor(props) {
    super(props);

    this._renderPrintButton = this._renderPrintButton.bind(this);
  }

  _renderPrintButton() {
    const { displayPrintButton } = this.props;

    if (displayPrintButton) {
      return (
        <NavItem>
          <PrintButton />
        </NavItem>
      );
    }

    return null;
  }

  render() {
    return (
      <Wrapper>
        <Brand>TravelPathExplorer</Brand>
        <Nav>
          {this._renderPrintButton()}
          <NavItem>
            <NavLink href="https:///www.github.com/gy-chen/travel_path_explorer">
              <Github size={24} />
            </NavLink>
          </NavItem>
        </Nav>
      </Wrapper>
    );
  }
}

Navbar.propTypes = {
  displayPrintButton: PropTypes.bool
};

export default Navbar;
