import React from 'react';
import { leagues } from '../static/leagues';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core';

const LeaguesNavbar = () => {
  const location = useLocation();

  const leagueTabs = leagues.map((league, leagueIdx) => {
    return (
      <Link key={leagueIdx} to={`/${league.shortHand}`}>
        <Tab
          style={{ marginRight: 5 }}
          value={leagueIdx}
          icon={<img src={league.logo} height="55" alt={league.name} />}
        />
      </Link>
    );
  });
  const currLocIdx = leagues.findIndex(
    (league) => `/${league.shortHand}` === location.pathname
  );
  return (
    <AppBar position="static" textColor="primary" color="transparent">
      <Tabs color="transparent" value={currLocIdx}>
        {leagueTabs}
      </Tabs>
    </AppBar>
  );
};

export default LeaguesNavbar;
