import { produce } from 'immer';
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

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FILL_TABLES': {
      const { table, error, season, league } = action.payload;
      return produce(state, (draft) => {
        draft.tables[league][seasonIdx[season]] = {
          isLoaded: Boolean(!error),
          error,
          table,
        };
      });
    }
    case 'FILL_MATCHUPS': {
      const { matches, error, league } = action.payload;
      return produce(state, (draft) => {
        draft.matchUps[league] = {
          isLoaded: Boolean(!error),
          error,
          matches,
        };
      });
    }
    case 'CHANGE_SEASON': {
      const { league, season } = action.payload;
      return produce(state, (draft) => {
        draft.seasons[league] = season;
      });
    }
    case 'CHANGE_VIEW': {
      const { league, view } = action.payload;
      return produce(state, (draft) => {
        draft.views[league] = view;
      });
    }
    default:
      return state;
  }
};

export default reducer;
