import React, { useMemo } from 'react';
import { leagues } from '../static/leagues';
import { Link, useLocation } from 'react-router-dom';
import { Tabs, Tab, AppBar } from '@material-ui/core';

const Navbar = () => {
  const { pathname } = useLocation();
  const leagueId = Number(pathname.toString().split('/')[2]);

  const leagueTabs = useMemo(() => {
    return leagues.map((league, leagueIdx) => {
      return (
        <Tab
          style={{ marginRight: 5 }}
          key={leagueIdx}
          value={leagueIdx}
          icon={<img src={league.logo} height="60" alt={league.name} />}
          component={Link}
          to={`/league/${leagueIdx}`}
        />
      );
    });
  }, []);
  return (
    <AppBar position="static" textColor="primary" color="transparent">
      <Tabs color="transparent" value={leagueId}>
        {leagueTabs}
      </Tabs>
    </AppBar>
  );
};

export default Navbar;
