import React from 'react';
import { leagues } from '../../static/leagues';

export default (props) => {
  return (
    <div>
      {leagues[props.leagueIdx].name} Top Scorers, Season: {props.season}
    </div>
  );
};
