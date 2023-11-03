import { useState } from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
Button,
Collapse,
Nav,
NavLink,
NavItem,
Navbar,
NavbarBrand,
NavbarToggler,
} from "reactstrap";
import { logout } from "../managers/authmanager"
import logo from '/Users/deannadavis/workspace/csharp/GiftGuru/client/src/giftgurulogo.png'



export default function NavBar({ loggedInUser, setLoggedInUser }) {
const [open, setOpen] = useState(false);

const toggleNavbar = () => setOpen(!open);

return (
    <div>
    <Navbar color="light" light fixed="true" expand="lg">

        <NavbarBrand className="mr-auto" tag={RRNavLink} to="/">
        <img
            src= {logo} 
            height="30"
            className="d-inline-block align-top"
            alt="GiftGuru Logo"
          />
        GIFTGURU
        </NavbarBrand>
        {loggedInUser ? (
        <>
            <NavbarToggler onClick={toggleNavbar} />
            <Collapse isOpen={open} navbar>
            <Nav navbar></Nav>
            </Collapse>
            <NavItem>
                  <NavLink tag={RRNavLink} to="/user-profile">
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/FamilyMembers">
                    Family Members
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/MyFamilyList">
                    My Family List
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/create-member">
                    Add a Member!
                  </NavLink>
                </NavItem>
            <Button
            color="primary"
            onClick={(e) => {
                e.preventDefault();
                setOpen(false);
                logout().then(() => {
                setLoggedInUser(null);
                setOpen(false);
                });
            }}
            >
            Logout
            </Button>
        </>
        ) : (
        <Nav navbar>
            <NavItem>
            <NavLink tag={RRNavLink} to="/login">
                <Button color="primary">Login</Button>
            </NavLink>
            </NavItem>
        </Nav>
        )}
    </Navbar>
    </div>
);
}