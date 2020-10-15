import { seasons as seasonsArr, seasonIdx } from '../static/seasons';
import { leagues } from '../static/leagues';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FILL_TABLES': {
      const { table, error, idx, season } = action.payload;
      let newTables = [...state.tables];
      newTables[idx][seasonIdx[season]] = {
        isLoaded: Boolean(!error),
        error,
        table,
      };
      return { ...state, tables: newTables };
    }
    case 'FILL_MATCHUPS': {
      const { matches, error, idx } = action.payload;
      let newMatchUps = [...state.matchUps];
      newMatchUps[idx] = {
        isLoaded: Boolean(!error),
        error,
        matches,
      };
      return { ...state, matchUps: newMatchUps };
    }
    default:
      throw new Error('Action Type Unavailable');
  }
};

export const initialState = {
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

export default reducer;
