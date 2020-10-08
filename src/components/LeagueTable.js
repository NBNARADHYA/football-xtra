import React from 'react';

class LeagueTable extends React.Component {
    render() {
        return (
            <div>
                {this.props.league.name} {' '} Table
            </div>
        );
    }
}

export default LeagueTable;