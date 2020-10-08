import React from 'react';

class LeagueTopScorers extends React.Component {
    render() {
        return (
            <div>
                {this.props.league.name} {' '} Top Scorers
            </div>
        );
    }
}

export default LeagueTopScorers;