import React from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { leagues } from '../static/leagues';
import { weekDays } from '../static/weekDays';

class LeagueMatches extends React.Component {

    getMatchUpsData(idx) {
        axios.get(`https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagues[idx].id}`)
        .then(
            res => {
                this.props.populateMatchUps({
                    isLoaded: true,
                    matches: res.data.events,
                    error: null
                },
                idx);
            },
            error => {
                this.props.populateMatchUps({
                    error,
                    isLoaded: false,
                    matches: []
                },
                idx);
            }
        );
    }

    getDate(timeStamp) {
        const d = new Date(timeStamp);
        return `${weekDays[d.getDay()]}, ${d.getDate()}/${d.getMonth()} at ${d.getHours()}:${d.getMinutes()} IST`;
    }

    render() {
        if(this.props.view !== "matches")   return null;

        const { error, isLoaded, matches } = this.props.matchUps;
        const style1 = { position: "fixed", top: "50%", left: "50%" };

        if(error) return <div style={style1}>Sorry, Unable to fetch the standings</div>;

        if(!isLoaded) {
            this.getMatchUpsData(this.props.leagueIdx);
            const style = { position: "fixed", top: "40%", left: "37%" };
            return <img style={style} src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" alt="Loading..." />;
        }

        const matchesDisplay = matches.map((match, index) => {
            return (
                <Card key={index} border="secondary" className="text-center ">
                    <Card.Header>Matchday {match.intRound}</Card.Header>
                    <Card.Body><Card.Text>{match.strHomeTeam} vs {match.strAwayTeam}</Card.Text></Card.Body>
                    <Card.Footer>{this.getDate(match.strTimestamp)}</Card.Footer>
                </Card>
            );
        });

        return (
            <div>
                {matchesDisplay}
            </div>
        );
        
    }
}

export default LeagueMatches;