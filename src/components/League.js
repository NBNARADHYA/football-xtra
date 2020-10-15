import React, { useState, useEffect, useReducer, useCallback } from 'react';
import axios from 'axios';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import LeagueMatches from '../components/LeagueMatches';
import ViewsNavbar from '../components/ViewsNavbar';
import { leagues } from '../static/leagues';
import { seasonIdx } from '../static/seasons';
import reducer, { initialState } from './reducer';

const League = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [views, setViews] = useState(Array(leagues.length).fill('table'));
  const [seasons, setSeasons] = useState(
    Array(leagues.length).fill('2020-2021')
  );
  const league = props.leagueIdx;

  const changeView = useCallback((view, idx) => {
    setViews((prevViews) => {
      let newViews = [...prevViews];
      newViews[idx] = view;
      return newViews;
    });
  }, []);

  const changeSeason = useCallback((season, idx) => {
    setSeasons((prevSeasons) => {
      let newSeasons = [...prevSeasons];
      newSeasons[idx] = season;
      return newSeasons;
    });
  }, []);

  const getTableData = useCallback(
    async (idx, season) => {
      if (state.tables[idx][seasonIdx[season]].isLoaded) return;
      let payload = { table: null, error: null, idx, season };
      try {
        const response = await axios(
          `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagues[idx].id}&s=${season}`
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
    async (idx) => {
      if (state.matchUps[idx].isLoaded) return;
      let payload = { matches: null, error: null, idx };
      try {
        const response = await axios(
          `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagues[idx].id}`
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
    if (views[league] === 'table') {
      getTableData(league, seasons[league]);
    } else if (views[league] === 'matches') {
      getMatchUpsData(league);
    }
  }, [league, views, seasons, getTableData, getMatchUpsData]);

  const view = views[league];
  const season = seasons[league];
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
        <LeagueTable
          tableData={state.tables[league][seasonIdx[season]]}
          leagueIdx={league}
          season={season}
        />
      )}
      {view === 'top-scorers' && (
        <LeagueTopScorers leagueIdx={league} season={season} />
      )}
      {view === 'matches' && (
        <LeagueMatches matchUps={state.matchUps[league]} leagueIdx={league} />
      )}
    </div>
  );
};

export default League;
