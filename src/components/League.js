import React from 'react';
import { leagues } from '../static/leagues';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';

class League extends React.Component {

    render() {

        let navContent;

        if(this.props.view === "table") {
            navContent = <LeagueTable league={leagues[this.props.leagueIdx]} />
        }
        else {
            navContent = <LeagueTopScorers league={leagues[this.props.leagueIdx]} />
        }

        return (
            <div>
                {navContent}
            </div>
        );
    }
}

export default League;