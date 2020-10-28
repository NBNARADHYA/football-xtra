import React from 'react';
import Navbar from './Navbar';
import { League } from '../components/';
import { Switch, Route, Redirect } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/league/:leagueId" children={<League />}></Route>
        <Redirect to="/league/0" />
      </Switch>
    </>
  );
};

export default App;
