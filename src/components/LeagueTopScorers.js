import React from 'react';
import { leagues } from '../static/leagues';

const LeagueTopScorers = (props) => {
  return (
    <div>
      {leagues[props.leagueIdx].name} Top Scorers, Season: {props.season}
    </div>
  );
};

export default LeagueTopScorers;
