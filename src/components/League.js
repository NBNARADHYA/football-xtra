import React from 'react';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';

class League extends React.Component {

    render() {
        return (
            <div>
                <LeagueTable
                    tableData={this.props.tableData}
                    view={this.props.view}
                    leagueIdx={this.props.leagueIdx}
                    populateTables={this.props.populateTables}
                />
                <LeagueTopScorers leagueIdx={this.props.leagueIdx} view={this.props.view} />
            </div>
        );
    }
}

export default League;