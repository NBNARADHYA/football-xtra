import React from 'react';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import { leagues } from '../static/leagues';

class League extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tables: Array(leagues.length).fill(0).map(() => ({
                isLoaded: false,
                error: null,
                table: []
            }))
        };
    }

    populateTables(data, idx) {
        this.setState(prevState => {
            let newTables = prevState.tables.slice();
            newTables[idx] = data;
            return { tables: newTables };
        });
    }

    render() {
        return (
            <div>
                <LeagueTable
                    tableData={this.state.tables[this.props.leagueIdx]}
                    view={this.props.view}
                    leagueIdx={this.props.leagueIdx}
                    populateTables={(data, idx) => this.populateTables(data, idx)}
                />
                <LeagueTopScorers leagueIdx={this.props.leagueIdx} view={this.props.view} />
            </div>
        );
    }
}

export default League;