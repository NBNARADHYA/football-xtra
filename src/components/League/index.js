import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@apollo/client';
import Table from './Table';
import TopScorers from './TopScorers';
import Matches from './Matches/';
import ViewsNavbar from './ViewsNavbar';
import { leagues } from '../../static/leagues';
import { seasonIdx } from '../../static/seasons';
import { GET_MATCHES } from './Queries/';

const League = () => {
  const { leagueId } = useParams();
  const tables = useSelector((state) => state.tables[leagueId]);
  const view = useSelector((state) => state.views[leagueId]);
  const season = useSelector((state) => state.seasons[leagueId]);

  const { loading, error, data } = useQuery(GET_MATCHES, {
    variables: {
      season,
      div: leagues[leagueId].div,
    },
  });

  const dispatch = useDispatch();

  const changeView = useCallback(
    (view) =>
      dispatch({ type: 'CHANGE_VIEW', payload: { view, league: leagueId } }),
    [leagueId, dispatch]
  );

  const changeSeason = useCallback(
    (season) => {
      dispatch({
        type: 'CHANGE_SEASON',
        payload: { season, league: leagueId },
      });
    },
    [leagueId, dispatch]
  );

  useEffect(() => {
    if (view === 'table') {
      if (tables[seasonIdx[season]].isLoaded || loading) return;
      dispatch({
        type: 'FILL_TABLES',
        payload: {
          data,
          error,
          season,
          league: leagueId,
        },
      });
    }
  }, [leagueId, view, season, data, error, loading, tables, dispatch]);

  return (
    <div>
      <ViewsNavbar
        changeLeagueView={changeView}
        view={view}
        season={season}
        changeSeason={changeSeason}
      />
      {view === 'table' && <Table tableData={tables[seasonIdx[season]]} />}
      {view === 'top-scorers' && (
        <TopScorers leagueIdx={leagueId} season={season} />
      )}
      {view === 'matches' && <Matches matchUps={{ data, error, loading }} />}
    </div>
  );
};

export default League;
