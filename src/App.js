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
      views: Array(viewsArr.length).fill("table")
    };
  }

  changeViews(view) {
    let temp = this.state.views.slice();
    temp[this.state.currLeagueIdx] = view;
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
        <ViewsNavbar changeLeagueView={view => this.changeViews(view)} view={this.state.views[this.state.currLeagueIdx]} />
        <League leagueIdx={this.state.currLeagueIdx} view={this.state.views[this.state.currLeagueIdx]} />
      </div>
    );
  }
}

export default App;