import { gql } from '@apollo/client';

export const GET_MATCHES = gql`
  query GetMatches($season: String!, $div: String!) {
    matches(season: $season, div: $div) {
      date
      time
      hometeam
      awayteam
      fthg
      ftag
      ftr
      referee
      hs
      as
      hst
      ast
      hf
      af
      hc
      ac
      hy
      ay
      hr
      ar
    }
  }
`;
