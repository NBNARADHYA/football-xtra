import React from 'react';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';

class League extends React.Component {

    render() {

        let navContent;

        if(this.props.view === "table") {
            navContent = <LeagueTable leagueIdx={this.props.leagueIdx} populateTables={this.props.populateTables} tableData={this.props.tableData} />
        }
        else {
            navContent = <LeagueTopScorers leagueIdx={this.props.leagueIdx} />
        }

        return (
            <div>
                {navContent}
            </div>
        );
    }
}

export default League;