import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { leagues } from '../static/leagues';

class LeagueNavbar extends React.Component {
    render() {
        const leagueNav = leagues.map((league, leagueIdx) => {
            return (
                <Nav.Link className="ml-5" key={leagueIdx} eventKey={leagueIdx}>
                    <img src={league.logo} height="40" alt={league.name} />
                </Nav.Link>
            );
        });
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Navbar.Brand className="ml-5 mr-5" href="http://localhost:3000">Football Xtra</Navbar.Brand>
                <Navbar.Toggle aria-controls="league-nav" />
                <Navbar.Collapse id="league-nav">
                    <Nav onSelect={leagueIdx => this.props.changeLeague(leagueIdx)}>
                        {leagueNav}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default LeagueNavbar;