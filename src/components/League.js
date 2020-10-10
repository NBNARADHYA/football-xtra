import React from 'react';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import LeagueMatches from '../components/LeagueMatches';
import { leagues } from '../static/leagues';

class League extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tables: Array(leagues.length).fill(0).map(() => ({
                isLoaded: false,
                error: null,
                table: []
            })),
            matchUps: Array(leagues.length).fill(0).map(() => ({
                isLoaded: false,
                error: null,
                matches: []
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

    populateMatchUps(data, idx) {
        this.setState(prevState => {
            let newMatchUps = prevState.matchUps.slice();
            newMatchUps[idx] = data;
            return { matchUps: newMatchUps };
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
                <LeagueMatches 
                    matchUps={this.state.matchUps[this.props.leagueIdx]}
                    view={this.props.view}
                    leagueIdx={this.props.leagueIdx}
                    populateMatchUps={(data, idx) => this.populateMatchUps(data, idx)}
                />
            </div>
        );
    }
}

export default League;