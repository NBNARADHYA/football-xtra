import React from 'react';
import LeaguesNavbar from './components/LeaguesNavbar';
import League from './components/League';
import ViewsNavbar from './components/ViewsNavbar';
import { leagues } from './static/leagues';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currLeagueIdx: 0,
      views: Array(leagues.length).fill("table"),
      isLoaded: Array(leagues.length).fill(false),
      error: Array(leagues.length).fill(null),
      tables: Array(leagues.length).fill([])
    };
  }

  populateTables(data, idx) {
    this.setState(prevState => {
      let temp1 = prevState.tables.slice();
      let temp2 = prevState.error.slice();
      let temp3 = prevState.isLoaded.slice();
      temp1[idx] = data.table;
      temp2[idx] = data.error;
      temp3[idx] = data.isLoaded;
      return ({
        isLoaded: temp3,
        error: temp2,
        tables: temp1
      });
    });
  }

  changeViews(view, idx) {
    let temp = this.state.views.slice();
    temp[idx] = view;
    this.setState({
        views: temp
    });
  }

  changeLeague(idx) {
    this.setState({
      currLeagueIdx: idx
    });
  }

  render() {
    const tableData = {
      isLoaded: this.state.isLoaded[this.state.currLeagueIdx],
      error: this.state.error[this.state.currLeagueIdx],
      table: this.state.tables[this.state.currLeagueIdx]
    };

    return (
      <div>
        <LeaguesNavbar changeLeague={idx => this.changeLeague(idx)} />
        <ViewsNavbar
          changeLeagueView={(view, idx) => this.changeViews(view, idx)}
          view={this.state.views[this.state.currLeagueIdx]}
          leagueIdx={this.state.currLeagueIdx}
        />
        <League
          leagueIdx={this.state.currLeagueIdx}
          view={this.state.views[this.state.currLeagueIdx]}
          tableData={tableData}
          populateTables={(data, idx) => this.populateTables(data, idx)}
        />
      </div>
    );
  }
}

export default App;