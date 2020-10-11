import React from 'react';
import { leagues } from '../static/leagues';

class LeagueTopScorers extends React.Component {

    render() {
        if(this.props.view !== "top-scorers")   return null;
        return (
            <div>
                {leagues[this.props.leagueIdx].name} Top Scorers, Season: {this.props.season} 
            </div>
        );
    }
}

export default LeagueTopScorers;