import React from 'react';
import { Table } from 'react-bootstrap';

const LeagueTable = (props) => {
  const { error, isLoaded, table } = props.tableData;
  const style1 = { position: 'fixed', top: '50%', left: '50%' };

  if (error)
    return <div style={style1}>Sorry, Unable to fetch the standings</div>;

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
      <tr key={pos}>
        <td>{pos + 1}</td>
        <td>{club.name}</td>
        <td>{club.played}</td>
        <td>{club.goalsfor}</td>
        <td>{club.goalsagainst}</td>
        <td>{club.goalsdifference}</td>
        <td>{club.win}</td>
        <td>{club.draw}</td>
        <td>{club.loss}</td>
        <td>{club.total}</td>
      </tr>
    );
  });
  return (
    <Table className="mb-0" striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>#</th>
          <th>Club</th>
          <th>Played</th>
          <th>GF</th>
          <th>GA</th>
          <th>GD</th>
          <th>W</th>
          <th>D</th>
          <th>L</th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>{standings}</tbody>
    </Table>
  );
};

export default LeagueTable;
