import React, { useEffect, useCallback } from 'react';
import axios from 'axios';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import LeagueMatches from '../components/LeagueMatches';
import ViewsNavbar from '../components/ViewsNavbar';
import { leagues } from '../static/leagues';
import { seasonIdx } from '../static/seasons';
import { useDispatch, useSelector } from 'react-redux';

const League = ({ leagueIdx: league }) => {
  const tables = useSelector((state) => state.tables[league]);
  const matchUps = useSelector((state) => state.matchUps[league]);
  const view = useSelector((state) => state.views[league]);
  const season = useSelector((state) => state.seasons[league]);

  const dispatch = useDispatch();

  const changeView = useCallback(
    (view) => dispatch({ type: 'CHANGE_VIEW', payload: { view, league } }),
    [league, dispatch]
  );

  const changeSeason = useCallback(
    (season) => {
      dispatch({ type: 'CHANGE_SEASON', payload: { season, league } });
      view === 'matches' &&
        dispatch({ type: 'CHANGE_VIEW', payload: { view: 'table', league } });
    },
    [view, league, dispatch]
  );

  const getTableData = useCallback(
    async (league, season) => {
      if (tables[seasonIdx[season]].isLoaded) return;
      let payload = { table: null, error: null, season, league };
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
    [tables, dispatch]
  );

  const getMatchUpsData = useCallback(
    async (league) => {
      if (matchUps.isLoaded) return;
      let payload = { matches: null, error: null, league };
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
    [matchUps, dispatch]
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
        season={season}
        changeSeason={changeSeason}
      />
      {view === 'table' && (
        <LeagueTable tableData={tables[seasonIdx[season]]} />
      )}
      {view === 'top-scorers' && (
        <LeagueTopScorers leagueIdx={league} season={season} />
      )}
      {view === 'matches' && <LeagueMatches matchUps={matchUps} />}
    </div>
  );
};

export default League;
