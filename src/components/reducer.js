import { seasons as seasonsArr, seasonIdx } from '../static/seasons';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FILL_TABLES': {
      const { table, error, season } = action.payload;
      let newTables = [...state.tables];
      newTables[seasonIdx[season]] = {
        isLoaded: Boolean(!error),
        error,
        table,
      };
      return { ...state, tables: newTables };
    }
    case 'FILL_MATCHUPS': {
      const { matches, error } = action.payload;
      return {
        ...state,
        matchUps: {
          isLoaded: Boolean(!error),
          error,
          matches,
        },
      };
    }
    default:
      throw new Error('Action Type Unavailable');
  }
};

export const initialState = {
  tables: Array(seasonsArr.length)
    .fill(0)
    .map(() => ({
      isLoaded: false,
      error: null,
      table: [],
    })),
  matchUps: {
    isLoaded: false,
    error: null,
    matches: [],
  },
};

export default reducer;
