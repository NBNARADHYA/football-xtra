import produce from 'immer';
import { seasons as seasonsArr, seasonIdx } from '../static/seasons';
import { leagues } from '../static/leagues';

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
  views: Array(leagues.length).fill('table'),
  seasons: Array(leagues.length).fill('2020-2021'),
};

export default produce((draft, action) => {
  switch (action.type) {
    case 'FILL_TABLES': {
      const { table, error, season, league } = action.payload;
      draft.tables[league][seasonIdx[season]] = {
        isLoaded: Boolean(!error),
        error,
        table,
      };
      break;
    }
    case 'FILL_MATCHUPS': {
      const { matches, error, league } = action.payload;
      draft.matchUps[league] = {
        isLoaded: Boolean(!error),
        error,
        matches,
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
    default:
      break;
  }
}, initialState);
