import React from 'react';
import { leagues } from '../static/leagues';

class LeagueTopScorers extends React.Component {
    render() {
        return (
            <div>
                {leagues[this.props.leagueIdx].name} {' '} Top Scorers
            </div>
        );
    }
}

export default LeagueTopScorers;