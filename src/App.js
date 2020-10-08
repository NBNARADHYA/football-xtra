import React from 'react';
import LeaguesNavbar from './components/LeaguesNavbar';
import League from './components/League';
import ViewsNavbar from './components/ViewsNavbar';
import { views as viewsArr } from './static/views';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      currLeagueIdx: 0,
      views: Array(viewsArr.length).fill("table"),
      tables: Array(viewsArr.length).fill({
        isLoaded: false,
        error: null,
        table: [] 
      })
    };
  }

  populateTables(data, idx) {
    let temp = this.state.tables.slice();
    temp[idx] = data;
    this.setState({
      tables: temp
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
          populateTables={(data, idx) => this.populateTables(data, idx)}
          tableData={this.state.tables[this.state.currLeagueIdx]}
        />
      </div>
    );
  }
}

export default App;