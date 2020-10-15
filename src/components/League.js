import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import LeagueMatches from '../components/LeagueMatches';
import ViewsNavbar from '../components/ViewsNavbar';
import { leagues } from '../static/leagues';
import { seasons as seasonsArr, seasonIdx } from '../static/seasons';

const initialState = {
  tables: Array(leagues.length)
    .fill(0)
    .map(() =>
      Array(seasonsArr.length)
        .fill(0)
        .map(() => ({
          isLoaded: false,
          error: null,
          table: [],
        }))
    ),
  matchUps: Array(leagues.length)
    .fill(0)
    .map(() => ({
      isLoaded: false,
      error: null,
      matches: [],
    })),
};

const populateTables = (table, tables, idx, season, error) => {
  let newTables = tables.slice();
  newTables[idx][seasonIdx[season]] = {
    isLoaded: Boolean(!error),
    error,
    table,
  };
  console.log(newTables);
  return newTables;
};

const populateMatchUps = (matches, matchUps, idx, error) => {
  let newMatchUps = matchUps.slice();
  newMatchUps[idx] = {
    isLoaded: Boolean(!error),
    error,
    matches,
  };
  return newMatchUps;
};

const getMatchUpsData = async (idx, state) => {
  const { matchUps } = state;
  if (matchUps[idx].isLoaded) return state;
  let newMatchUps;
  try {
    const response = await axios(
      `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagues[idx].id}`
    );
    newMatchUps = populateMatchUps(response.data.events, matchUps, idx, null);
  } catch (error) {
    newMatchUps = populateMatchUps(null, matchUps, idx, error);
  }
  return { ...state, matchUps: newMatchUps };
};

const getTableData = async (idx, season, state) => {
  console.log('table');
  const { tables } = state;
  if (tables[idx][seasonIdx[season]].isLoaded) return state;
  let newTables;
  try {
    const response = await axios(
      `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagues[idx].id}&s=${season}`
    );
    newTables = populateTables(response.data.table, tables, idx, season, null);
  } catch (error) {
    newTables = populateTables(null, tables, idx, season, error);
  }
  return { ...state, tables: newTables };
};

const reducer = (state, action) => {
  console.log(state);
  switch (action.type) {
    case 'FILL_TABLES':
      return getTableData(action.payload.league, action.payload.season, state);
    case 'FILL_MATCHUPS':
      return getMatchUpsData(action.payload.league, state);
    default:
      throw new Error('Action Type Unavailable');
  }
};

const League = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [views, setViews] = useState(Array(leagues.length).fill('table'));
  const [seasons, setSeasons] = useState(
    Array(leagues.length).fill('2020-2021')
  );
  const league = props.leagueIdx;

  const changeView = (view, idx) => {
    let newViews = views.slice();
    newViews[idx] = view;
    setViews(newViews);
  };

  const changeSeason = (season, idx) => {
    let newSeasons = seasons.slice();
    newSeasons[idx] = season;
    setSeasons(newSeasons);
  };

  useEffect(() => {
    console.log('ief');
    if (views[league] === 'table') {
      dispatch({
        type: 'FILL_TABLES',
        payload: { league: league, season: seasons[league] },
      });
    } else if (views[league] === 'matches') {
      dispatch({ type: 'FILL_MATCHUPS', payload: { league: league } });
    }
  }, [league, views, seasons]);

  const view = views[league];
  const season = seasons[league];
  console.log('hi');
  console.log(state);
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
