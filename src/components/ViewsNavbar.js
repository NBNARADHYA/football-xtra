import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { views } from "../static/views";
import { seasons } from "../static/seasons";

const LeagueNavbar = (props) => {
    const viewsNav = views.map((view) => {
        return (
            <Nav.Link key={view.key} eventKey={view.key}>
                {view.name}
            </Nav.Link>
        );
    });
    const seasonsDropdownItems = seasons.map((season) => {
        return (
            <NavDropdown.Item eventKey={season} key={season}>
                {season}
            </NavDropdown.Item>
        );
    });
    return (
        <Navbar bg="dark" variant="dark">
            <Nav
                activeKey={props.view}
                onSelect={(view) =>
                    props.changeLeagueView(view, props.leagueIdx)
                }
            >
                {viewsNav}
            </Nav>
            <Nav
                activeKey={props.season}
                onSelect={(season) =>
                    props.changeSeason(season, props.leagueIdx)
                }
            >
                <NavDropdown title={`Season ${props.season}`}>
                    {seasonsDropdownItems}
                </NavDropdown>
            </Nav>
        </Navbar>
    );
};

export default LeagueNavbar;
