import React from 'react';
import LeagueNavbar from './components/LeagueNavbar';
import League from './components/League';
import { Nav } from 'react-bootstrap';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currLeagueIdx: 0,
      leagueView: "table"
    };
  }

  changeLeagueView(view) {
      this.setState({
          leagueView: view
      });
  }

  changeLeague(idx) {
    this.setState({
      currLeagueIdx: idx,
      leagueView: "table"
    });
  }

  render() {
    return (
      <div>
        <LeagueNavbar changeLeague={idx => this.changeLeague(idx)} />
        <Nav variant="tabs" activeKey={this.state.leagueView} onSelect={key => this.changeLeagueView(key)}>
            <Nav.Link eventKey="table">Standings</Nav.Link>
            <Nav.Link eventKey="top-scorers">Top Scorers</Nav.Link>
        </Nav>
        <League leagueIdx={this.state.currLeagueIdx} view={this.state.leagueView} />
      </div>
    );
  }
}

export default App;