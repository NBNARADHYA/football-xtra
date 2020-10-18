import React, { useState, useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import LeagueMatches from '../components/LeagueMatches';
import ViewsNavbar from '../components/ViewsNavbar';
import { leagues } from '../static/leagues';
import { seasonIdx } from '../static/seasons';
import reducer, { initialState } from './reducer';

const League = ({ leagueIdx: league }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [view, setView] = useState('table');
  const [season, setSeason] = useState('2020-2021');

  const changeView = useCallback((view) => setView(view), []);

  const changeSeason = useCallback(
    (season) => {
      if (view === 'matches') {
        setSeason(season);
        setView('table');
      } else {
        setSeason(season);
      }
    },
    [view]
  );

  const getTableData = useCallback(
    async (league, season) => {
      if (state.tables[seasonIdx[season]].isLoaded) return;
      let payload = { table: null, error: null, season };
      try {
        const response = await axios(
          `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagues[league].id}&s=${season}`
        );
        payload = { ...payload, table: response.data.table };
      } catch (error) {
        payload = { ...payload, error };
      }
      dispatch({ type: 'FILL_TABLES', payload });
    },
    [state.tables]
  );

  const getMatchUpsData = useCallback(
    async (league) => {
      if (state.matchUps.isLoaded) return;
      let payload = { matches: null, error: null };
      try {
        const response = await axios(
          `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagues[league].id}`
        );
        payload = { ...payload, matches: response.data.events };
      } catch (error) {
        payload = { ...payload, error };
      }
      dispatch({ type: 'FILL_MATCHUPS', payload });
    },
    [state.matchUps]
  );

  useEffect(() => {
    if (view === 'table') {
      getTableData(league, season);
    } else if (view === 'matches') {
      getMatchUpsData(league);
    }
  }, [league, view, season, getTableData, getMatchUpsData]);

  return (
    <div>
      <ViewsNavbar
        changeLeagueView={changeView}
        view={view}
        leagueIdx={league}
        season={season}
        changeSeason={changeSeason}
      />
      {view === 'table' && (
        <LeagueTable tableData={state.tables[seasonIdx[season]]} />
      )}
      {view === 'top-scorers' && (
        <LeagueTopScorers leagueIdx={league} season={season} />
      )}
      {view === 'matches' && <LeagueMatches matchUps={state.matchUps} />}
    </div>
  );
};

export default League;
