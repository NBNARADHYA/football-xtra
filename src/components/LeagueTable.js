import React from 'react';
import { Spinner, Table } from 'react-bootstrap';
import axios from 'axios';
import { leagues } from '../static/leagues';

class LeagueTable extends React.Component {

    componentDidMount() {
        console.log("h");
        axios.get(`https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagues[this.props.leagueIdx].id}&s=2020-2021`)
        .then(
            res => {
                this.props.populateTables({
                    isLoaded: true,
                    table: res.data.table,
                    error: null
                },
                this.props.leagueIdx);
            },
            error => {
                this.props.populateTables({
                    error,
                    isLoaded: false,
                    table: []
                },
                this.props.leagueIdx);
            }
        );
    }



    render() {
        const { error, isLoaded, table } = this.props.tableData;
        if(error || !isLoaded) {
            const style = { position: "fixed", top: "50%", left: "50%" };
            return (
                <Spinner style={style} animation="grow" />
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