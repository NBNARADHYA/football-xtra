import React, { useEffect, useCallback } from 'react';
import LeagueTable from '../components/LeagueTable';
import LeagueTopScorers from '../components/LeagueTopScorers';
import LeagueMatches from '../components/LeagueMatches';
import ViewsNavbar from '../components/ViewsNavbar';
import { leagues } from '../static/leagues';
import { seasonIdx } from '../static/seasons';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_MATCHES } from '../queries';

const League = ({ leagueIdx: league }) => {
  const tables = useSelector((state) => state.tables[league]);
  const view = useSelector((state) => state.views[league]);
  const season = useSelector((state) => state.seasons[league]);

  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables: {
      season,
      div: leagues[league].div,
    },
  });

  const dispatch = useDispatch();

  const changeView = useCallback(
    (view) => dispatch({ type: 'CHANGE_VIEW', payload: { view, league } }),
    [league, dispatch]
  );

  const changeSeason = useCallback(
    (season) => {
      dispatch({ type: 'CHANGE_SEASON', payload: { season, league } });
    },
    [league, dispatch]
  );

  useEffect(() => {
    dispatch({ type: 'CHANGE_LEAGUE', payload: { league } });
  }, [league, dispatch]);

  useEffect(() => {
    if (view === 'table') {
      if (tables[seasonIdx[season]].isLoaded || loading) return;
      dispatch({
        type: 'FILL_TABLES',
        payload: {
          data,
          error,
          season,
          league,
        },
      });
    }
  }, [league, view, season, data, error, loading, tables, dispatch]);

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
      {view === 'matches' && (
        <LeagueMatches matchUps={{ data, error, loading }} />
      )}
    </div>
  );
};

export default League;
