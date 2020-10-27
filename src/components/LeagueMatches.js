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
  Table,
  TableContainer,
  Paper,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
} from '@material-ui/core';
import { Waypoint } from 'react-waypoint';
import { weekDays } from '../static/weekDays';

const getDate = (date, time) => {
  const d = new Date(Number(date));
  let year = d.getFullYear() % 100;
  let month = d.getMonth();
  if (year.toString().length < 2) {
    year = `0${year}`;
  }
  if (month.toString().length < 2) {
    month = `0${month}`;
  }
  let dateOutput = `${weekDays[d.getDay()]}, ${d.getDate()}/${month}/${year}`;
  if (time) {
    d.setTime(Date.parse(`01 Jan 1970 ${time} GMT`));
    dateOutput += ` at ${d.getHours()}:${d.getMinutes()} IST`;
  }
  return dateOutput;
};

const LeagueMatches = (props) => {
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
                <Typography gutterBottom>hi</Typography>
                <Typography color="textSecondary">1</Typography>
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
                    match.hr) && (
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell align="left">{match.hometeam}</TableCell>
                          <TableCell align="center">Match Stats</TableCell>
                          <TableCell align="right">{match.awayteam}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {match.hs !== undefined && (
                          <TableRow>
                            <TableCell align="left">{match.hs}</TableCell>
                            <TableCell align="center">Shots</TableCell>
                            <TableCell align="right">{match.aws}</TableCell>
                          </TableRow>
                        )}
                        {match.hst !== undefined && (
                          <TableRow>
                            <TableCell align="left">{match.hst}</TableCell>
                            <TableCell align="center">
                              Shots on Target
                            </TableCell>
                            <TableCell align="right">{match.ast}</TableCell>
                          </TableRow>
                        )}
                        {match.hc !== undefined && (
                          <TableRow>
                            <TableCell align="left">{match.hc}</TableCell>
                            <TableCell align="center">Corners</TableCell>
                            <TableCell align="right">{match.ac}</TableCell>
                          </TableRow>
                        )}
                        {match.hy !== undefined && (
                          <TableRow>
                            <TableCell align="left">{match.hy}</TableCell>
                            <TableCell align="center">Yellow Cards</TableCell>
                            <TableCell align="right">{match.ay}</TableCell>
                          </TableRow>
                        )}
                        {match.hr !== undefined && (
                          <TableRow>
                            <TableCell align="left">{match.hr}</TableCell>
                            <TableCell align="center">Red Cards</TableCell>
                            <TableCell align="right">{match.ar}</TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  )}
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

export default LeagueMatches;
