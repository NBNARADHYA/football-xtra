import React, { useState } from 'react';
import LeaguesNavbar from './components/LeaguesNavbar';
import League from './components/League';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { leagues } from './static/leagues';

const App = () => {
  const [leagueOutput] = useState(
    leagues.map((league, idx) => {
      return (
        <Route path={`/${league.shortHand}`} key={idx}>
          <League leagueIdx={idx} />
        </Route>
      );
    })
  );
  return (
    <Router>
      <LeaguesNavbar />
      <Switch>
        {leagueOutput}
        <Route path="/">
          <Redirect to="/epl" />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
