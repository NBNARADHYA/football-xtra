import React from 'react';
import LeaguesNavbar from './components/LeaguesNavbar';
import League from './components/League';

class App extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currLeague: 0
    };
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
        <League
          leagueIdx={this.state.currLeague}
        />
      </div>
    );
  }
}

export default App;