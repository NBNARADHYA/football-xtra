import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { views } from "../static/views";
import { seasons } from "../static/seasons";

class LeagueNavbar extends React.Component {
    render() {
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
                    activeKey={this.props.view}
                    onSelect={(view) =>
                        this.props.changeLeagueView(view, this.props.leagueIdx)
                    }
                >
                    {viewsNav}
                </Nav>
                <Nav
                    activeKey={this.props.season}
                    onSelect={(season) =>
                        this.props.changeSeason(season, this.props.leagueIdx)
                    }
                >
                    <NavDropdown title={`Season ${this.props.season}`}>
                        {seasonsDropdownItems}
                    </NavDropdown>
                </Nav>
            </Navbar>
        );
    }
}

export default LeagueNavbar;
