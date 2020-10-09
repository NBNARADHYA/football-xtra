import React from 'react';
import LeaguesNavbar from './components/LeaguesNavbar';
import League from './components/League';
import ViewsNavbar from './components/ViewsNavbar';
import { leagues } from './static/leagues';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currLeague: 0,
      views: Array(leagues.length).fill("table")
    };
  }

  changeViews(view, idx) {
    let newViews = this.state.views.slice();
    newViews[idx] = view;
    this.setState({
        views: newViews
    });
  }

  changeLeague(idx) {
    this.setState({
      currLeague: idx
    });
  }

  render() {

    return (
      <div>
        <LeaguesNavbar changeLeague={idx => this.changeLeague(idx)} />
        <ViewsNavbar
          changeLeagueView={(view, idx) => this.changeViews(view, idx)}
          view={this.state.views[this.state.currLeague]}
          leagueIdx={this.state.currLeague}
        />
        <League
          leagueIdx={this.state.currLeague}
          view={this.state.views[this.state.currLeague]}
        />
      </div>
    );
  }
}

export default App;