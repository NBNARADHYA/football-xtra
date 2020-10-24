import produce from 'immer';
import { seasons as seasonsArr, seasonIdx } from '../static/seasons';
import { leagues } from '../static/leagues';
import { getTableFromMatches } from './helpers';

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
  views: Array(leagues.length).fill('table'),
  seasons: Array(leagues.length).fill('2021'),
  league: 0,
};

export default produce((draft, action) => {
  switch (action.type) {
    case 'FILL_TABLES': {
      const { data, error, season, league } = action.payload;
      const table = getTableFromMatches(data, error);
      draft.tables[league][seasonIdx[season]] = {
        isLoaded: table.length || Boolean(error),
        error,
        table,
      };
      break;
    }
    case 'CHANGE_SEASON': {
      const { league, season } = action.payload;
      draft.seasons[league] = season;
      break;
    }
    case 'CHANGE_VIEW': {
      const { league, view } = action.payload;
      draft.views[league] = view;
      break;
    }
    case 'CHANGE_LEAGUE': {
      draft.league = action.payload.league;
      break;
    }
    default:
      break;
  }
}, initialState);
