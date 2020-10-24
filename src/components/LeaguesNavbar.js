import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { leagues } from '../static/leagues';
import { Link } from 'react-router-dom';

const LeaguesNavbar = () => {
  const leagueNav = leagues.map((league, leagueIdx) => {
    return (
      <Link className="ml-5" key={leagueIdx} to={`/${league.shortHand}`}>
        <img src={league.logo} height="40" alt={league.name} />
      </Link>
    );
  });
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand className="ml-5 mr-5" href="/">
        Football Xtra
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="league-nav" />
      <Navbar.Collapse id="league-nav">
        <Nav>{leagueNav}</Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default LeaguesNavbar;
