import React from 'react';
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
} from '@material-ui/core';

const LeagueTable = (props) => {
  const { error, isLoaded, table } = props.tableData;
  const style1 = { position: 'fixed', top: '50%', left: '50%' };

  if (error)
    return (
      <div style={style1}>Sorry, Unable to fetch TableCelle standings</div>
    );

  if (!isLoaded) {
    const style = { position: 'fixed', top: '40%', left: '37%' };
    return (
      <img
        style={style}
        src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
        alt="Loading..."
      />
    );
  }

  const standings = table.map((club, pos) => {
    return (
      <TableRow hover key={pos}>
        <TableCell>{pos + 1}</TableCell>
        <TableCell>{club.name}</TableCell>
        <TableCell>{club.mp}</TableCell>
        <TableCell>{club.gf}</TableCell>
        <TableCell>{club.ga}</TableCell>
        <TableCell>{club.gd}</TableCell>
        <TableCell>{club.w}</TableCell>
        <TableCell>{club.d}</TableCell>
        <TableCell>{club.l}</TableCell>
        <TableCell>{club.p}</TableCell>
      </TableRow>
    );
  });
  return (
    <Table>
      <TableHead>
        <TableRow hover>
          <TableCell>#</TableCell>
          <TableCell>Club</TableCell>
          <TableCell>Played</TableCell>
          <TableCell>GF</TableCell>
          <TableCell>GA</TableCell>
          <TableCell>GD</TableCell>
          <TableCell>W</TableCell>
          <TableCell>D</TableCell>
          <TableCell>L</TableCell>
          <TableCell>Points</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{standings}</TableBody>
    </Table>
  );
};

export default LeagueTable;
