import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';

export default ({
  match: { hometeam, awayteam, hs, aws, hst, ast, hc, ac, hy, ay, hr, ar },
}) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align="left">{hometeam}</TableCell>
          <TableCell align="center">Match Stats</TableCell>
          <TableCell align="right">{awayteam}</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {hs !== undefined && (
          <TableRow>
            <TableCell align="left">{hs}</TableCell>
            <TableCell align="center">Shots</TableCell>
            <TableCell align="right">{aws}</TableCell>
          </TableRow>
        )}
        {hst !== undefined && (
          <TableRow>
            <TableCell align="left">{hst}</TableCell>
            <TableCell align="center">Shots on Target</TableCell>
            <TableCell align="right">{ast}</TableCell>
          </TableRow>
        )}
        {hc !== undefined && (
          <TableRow>
            <TableCell align="left">{hc}</TableCell>
            <TableCell align="center">Corners</TableCell>
            <TableCell align="right">{ac}</TableCell>
          </TableRow>
        )}
        {hy !== undefined && (
          <TableRow>
            <TableCell align="left">{hy}</TableCell>
            <TableCell align="center">Yellow Cards</TableCell>
            <TableCell align="right">{ay}</TableCell>
          </TableRow>
        )}
        {hr !== undefined && (
          <TableRow>
            <TableCell align="left">{hr}</TableCell>
            <TableCell align="center">Red Cards</TableCell>
            <TableCell align="right">{ar}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
