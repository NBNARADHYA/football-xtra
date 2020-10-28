import React, { useEffect, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Divider,
  CircularProgress,
  Collapse,
  TextField,
  TableContainer,
  Paper,
} from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import MatchInfo from './MatchInfo';
import getDate from './getDate';

export default (props) => {
  const { error, loading, data } = props.matchUps;

  const [matchIndex, setMatchIndex] = useState([0, 14]);
  const [collapseId, setCollapseId] = useState(-1);
  const [searchMatchString, setSearchMatchString] = useState('');
  const [matches, setMatches] = useState(data && data.matches);
  const [maxIndex, setMaxIndex] = useState(14);

  useEffect(() => {
    setMatchIndex([0, 14]);
    setMaxIndex(14);
    setSearchMatchString('');
    setCollapseId(-1);
    if (props.matchUps.data) setMatches(props.matchUps.data.matches);
  }, [props]);

  useEffect(() => {
    if (searchMatchString.length && data) {
      setMatches(
        data.matches.filter((match) => {
          return (
            match.hometeam
              .toLowerCase()
              .indexOf(searchMatchString.toLowerCase()) !== -1 ||
            match.awayteam
              .toLowerCase()
              .indexOf(searchMatchString.toLowerCase()) !== -1
          );
        })
      );
    }
  }, [searchMatchString, data]);

  const style = { position: 'fixed', top: '50%', left: '50%' };

  if (error) return <div style={style}>Sorry, Unable to fetch the matches</div>;

  if (loading) {
    return <CircularProgress color="primary" style={style} />;
  }

  const [startMatchIndex, endMatchIndex] = matchIndex;

  return (
    <>
      <br />
      <TextField
        variant="filled"
        label="Search Matches"
        value={searchMatchString}
        onChange={(event) => setSearchMatchString(event.target.value)}
      />
      <br />
      {matches.slice(0, maxIndex + 1).map((match, index) => {
        if (index < startMatchIndex || index > endMatchIndex) {
          return (
            <Card key={index}>
              <CardContent>
                <Typography gutterBottom>
                  <br />
                </Typography>
                <Typography color="textSecondary">
                  <br />
                </Typography>
              </CardContent>
              <Divider variant="middle" />
            </Card>
          );
        }
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
                <TableContainer component={Paper}>
                  {match.referee && <div>Referee: {match.referee}</div>}
                  {(match.hs ||
                    match.hst ||
                    match.hc ||
                    match.hy ||
                    match.hr) && <MatchInfo match={match} />}
                </TableContainer>
              </Collapse>
              <Divider variant="middle" />
            </CardActionArea>
            {index === startMatchIndex && (
              <Waypoint
                onEnter={() => {
                  if (startMatchIndex !== 0) {
                    setMatchIndex((prev) => {
                      let [nextStartMatchIndex, nextEndMatchIndex] = prev;
                      nextStartMatchIndex = Math.max(
                        nextStartMatchIndex - 15,
                        0
                      );
                      if (nextEndMatchIndex - nextStartMatchIndex + 1 === 45)
                        nextEndMatchIndex -= 15;
                      return [nextStartMatchIndex, nextEndMatchIndex];
                    });
                  }
                }}
              />
            )}
            {index === endMatchIndex && (
              <Waypoint
                onEnter={() => {
                  if (endMatchIndex !== matches.length - 1) {
                    setMatchIndex((prev) => {
                      let [nextStartMatchIndex, nextEndMatchIndex] = prev;
                      nextEndMatchIndex = Math.min(
                        nextEndMatchIndex + 15,
                        matches.length - 1
                      );
                      if (nextEndMatchIndex - nextStartMatchIndex + 1 === 45)
                        nextStartMatchIndex += 15;
                      setMaxIndex((prev) => Math.max(prev, nextEndMatchIndex));
                      return [nextStartMatchIndex, nextEndMatchIndex];
                    });
                  }
                }}
              />
            )}
          </Card>
        );
      })}
    </>
  );
};
