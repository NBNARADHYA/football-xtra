import React from 'react';
import { Table } from 'react-bootstrap';
import { leagues } from '../static/leagues';
import axios from 'axios';

class LeagueTable extends React.Component {

    getTableData(idx) {
        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagues[idx].id}&s=2020-2021`)
        .then(
            res => {
                this.props.populateTables({
                    isLoaded: true,
                    table: res.data.table,
                    error: null
                },
                idx);
            },
            error => {
                this.props.populateTables({
                    error,
                    isLoaded: false,
                    table: []
                },
                idx);
            }
        );
    }

    render() {
        if(this.props.view !== "table") return null;
        const { error, isLoaded, table } = this.props.tableData;

        if(error || !isLoaded) {
            this.getTableData(this.props.leagueIdx);
            const style = { position: "fixed", top: "40%", left: "37%" };
            return <img style={style} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading..." />;
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
            <Table striped bordered hover variant="dark">
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
                <tbody>
                    {standings}
                </tbody>
            </Table>
        );
    }
}

export default LeagueTable;