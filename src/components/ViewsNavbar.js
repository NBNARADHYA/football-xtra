import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { views } from '../static/views';

class LeagueNavbar extends React.Component {
    
    render() {

        const viewsNav = views.map(view => {
            return (
                <Nav.Link key={view.key} eventKey={view.key}>{view.name}</Nav.Link>
            );
        });

        return (
            <Navbar bg="dark" variant="dark">
                <Nav activeKey={this.props.view} onSelect={view => this.props.changeLeagueView(view, this.props.leagueIdx)}>
                    {viewsNav}
                </Nav>
            </Navbar>
        );
    }
}

export default LeagueNavbar;