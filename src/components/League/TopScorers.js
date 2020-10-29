import React from 'react';
import { leagues } from '../../static/leagues';

const TopScorers = (props) => {
  return (
    <div>
      {leagues[props.leagueIdx].name} Top Scorers, Season: {props.season}
    </div>
  );
};

export default TopScorers;
