import React, { useContext, useState } from "react";
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    Button,
    NavbarText,
} from "reactstrap";
import { AuthContext } from "../App";
import { NavLink } from "react-router-dom";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    const { state, dispatch } = useContext(AuthContext);
    if (!state.isAuthenticated) {
        return (
            <div>
                <Navbar className="navbar-dark bg-dark" expand="md">
                    <NavbarToggler onClick={toggle} />
                    <Collapse isOpen={isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink to="/" className="nav-link">
                                    Home
                                </NavLink>
                            </NavItem>
                        </Nav>
                        <NavbarText>
                            <NavLink to="/login">Login</NavLink>
                        </NavbarText>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
    return (
        <div>
            <Navbar className="navbar-dark bg-dark" expand="md">
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="mr-auto" navbar>
                        <NavItem>
                            <NavLink to="/dashboard" className="nav-link">
                                Home
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink to="/product" className="nav-link">
                                Product
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <NavbarText>
                        <Button
                            color="danger"
                            onClick={() => {
                                dispatch({
                                    type: "Logout",
                                });
                            }}
                        >
                            Logout
                        </Button>
                    </NavbarText>
                </Collapse>
            </Navbar>
        </div>
    );
}

export default Menu;
