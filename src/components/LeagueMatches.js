import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Collapse,
} from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import { weekDays } from '../static/weekDays';

const getDate = (date, time) => {
  const d = new Date(Number(date));
  let year = d.getFullYear() % 100;
  if (year.toString().length < 2) {
    year = `0${year}`;
  }
  let dateOutput = `${
    weekDays[d.getDay()]
  }, ${d.getDate()}/${d.getMonth()}/${year}`;
  if (time) {
    d.setTime(Date.parse(`01 Jan 1970 ${time} GMT`));
    dateOutput += ` at ${d.getHours()}:${d.getMinutes()} IST`;
  }
  return dateOutput;
};

const LeagueMatches = (props) => {
  const { error, loading, data } = props.matchUps;
  const style = { position: 'fixed', top: '50%', left: '50%' };

  const [numMatches, setNumMatches] = useState(15);
  const [collapseId, setCollapseId] = useState(-1);

  useEffect(() => {
    setNumMatches(15);
  }, [props]);

  if (error) return <div style={style}>Sorry, Unable to fetch the matches</div>;

  if (loading) {
    return <CircularProgress color="primary" style={style} />;
  }

  const { matches } = data;

  return (
    <>
      {matches.slice(0, numMatches).map((match, index) => {
        return (
          <Card
            key={index}
            onClick={() => {
              setCollapseId((prevCollapseId) => {
                if (prevCollapseId !== index) {
                  return index;
                } else {
                  return -1;
                }
              });
            }}
          >
            <CardActionArea style={{ textAlign: 'center' }}>
              <CardContent>
                <Typography gutterBottom>
                  {match.hometeam} {match.fthg} - {match.ftag} {match.awayteam}
                </Typography>
                <Typography color="textSecondary">
                  {getDate(match.date, match.time)}
                </Typography>
              </CardContent>
              <Collapse in={collapseId === index}>
                {match.hometeam} {match.fthg} - {match.ftag} {match.awayteam}
              </Collapse>
              <Divider variant="middle" />
            </CardActionArea>
            {index === numMatches - 1 && (
              <Waypoint
                onEnter={() =>
                  numMatches !== matches.length &&
                  setNumMatches((prev) => Math.min(prev + 15, matches.length))
                }
              />
            )}
          </Card>
        );
      })}
    </>
  );
};

export default LeagueMatches;
