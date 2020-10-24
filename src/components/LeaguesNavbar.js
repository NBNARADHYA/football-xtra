import React from 'react';
import { leagues } from '../static/leagues';
import { Link } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core';
import { useSelector } from 'react-redux';

const LeaguesNavbar = () => {
  const league = useSelector((state) => state.league);

  const leagueTabs = leagues.map((league, leagueIdx) => {
    return (
      <Link key={leagueIdx} to={`/${league.shortHand}`}>
        <Tab
          style={{ marginRight: 5 }}
          value={leagueIdx}
          icon={<img src={league.logo} height="50" alt={league.name} />}
        />
      </Link>
    );
  });
  return (
    <AppBar position="static" textColor="primary" color="transparent">
      <Tabs color="transparent" value={league}>
        {leagueTabs}
      </Tabs>
    </AppBar>
  );
};

export default LeaguesNavbar;
