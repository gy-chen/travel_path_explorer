import React, { Component } from 'react';
import styled from 'styled-components';
import { Github } from 'styled-icons/fa-brands/Github';

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: #f8f9fa;
    padding: 1rem .5rem;

    flex-shrink: 0;
    flex-grow: 0;

    @media print {
        display: none;
    }
`;

const Brand = styled.h5`
    padding: 0 .5rem;
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
    padding: 0 .5rem;
    color: rgba(0, 0, 0, .5);
`;

const NavLink = styled.a`
    text-decoration: none;
    color: rgba(0, 0, 0, .5);

    &:hover {
        color: rgba(0, 0, 0, .7);
    }
`;

class Navbar extends Component {
    render() {
        return (
            <Wrapper>
                <Brand>TravelPathExplorer</Brand>
                <Nav>
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

export default Navbar;