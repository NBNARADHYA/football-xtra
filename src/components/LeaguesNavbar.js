import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { leagues } from '../static/leagues';

class LeagueNavbar extends React.Component {
    render() {
        const leagueNav = leagues.map((league, leagueIdx) => {
            return (
                <Nav.Link key={leagueIdx} eventKey={leagueIdx}>
                    <img src={league.logo} height="40" alt={league.name} />
                </Nav.Link>
            );
        });
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Toggle aria-controls="league-nav" />
                <Navbar.Collapse id="league-nav">
                    <Nav className="mr-auto" onSelect={leagueIdx => this.props.changeLeague(leagueIdx)}>
                        {leagueNav}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default LeagueNavbar;