import React, { useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  Button,
} from '@material-ui/core';
import { weekDays } from '../static/weekDays';

const getDate = (date, time) => {
  const d = new Date(Number(date));
  let dateOutput = `${weekDays[d.getDay()]}, ${d.getDate()}/${d.getMonth()}/${
    d.getFullYear() % 100
  }`;
  if (time) {
    d.setTime(Date.parse(`01 Jan 1970 ${time} GMT`));
    dateOutput += ` at ${d.getHours()}:${d.getMinutes()} IST`;
  }
  return dateOutput;
};

const LeagueMatches = (props) => {
  const { error, loading, data } = props.matchUps;
  const style1 = { position: 'fixed', top: '50%', left: '50%' };

  const [numMatches, setNumMatches] = useState(15);

  if (error)
    return <div style={style1}>Sorry, Unable to fetch the matches</div>;

  if (loading) {
    const style = { position: 'fixed', top: '40%', left: '37%' };
    return (
      <img
        style={style}
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
        alt="Loading..."
      />
    );
  }

  const { matches } = data;

  const matchesDisplay = matches
    .slice(0, numMatches - 1)
    .map((match, index) => {
      return (
        <Card key={index}>
          <CardActionArea style={{ textAlign: 'center' }}>
            <CardContent>
              <Typography gutterBottom>
                {match.hometeam} {match.fthg} - {match.ftag} {match.awayteam}
              </Typography>
              <Typography color="textSecondary">
                {getDate(match.date, match.time)}
              </Typography>
            </CardContent>

            <Divider variant="middle" />
          </CardActionArea>
        </Card>
      );
    });

  return (
    <div>
      {matchesDisplay}{' '}
      <div style={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          onClick={() =>
            setNumMatches((prev) => Math.min(prev + 15, matches.length))
          }
        >
          Load More Matches
        </Button>
      </div>
    </div>
  );
};

export default LeagueMatches;
