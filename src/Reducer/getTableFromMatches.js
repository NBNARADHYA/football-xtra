export default (data, error) => {
  const clubToIndexMap = {};

  const initialRow = {
    name: '',
    mp: 0,
    gf: 0,
    ga: 0,
    gd: 0,
    w: 0,
    d: 0,
    l: 0,
    p: 0,
  };

  const table = [];

  if (error) return table;
  const { matches } = data;
  matches.forEach((match) => {
    const homeTeam = match.hometeam;
    const awayTeam = match.awayteam;
    const team = [homeTeam, awayTeam];
    team.forEach((currTeam) => {
      if (clubToIndexMap[`${currTeam}`] === undefined) {
        table.push({
          ...initialRow,
          name: currTeam,
        });
        clubToIndexMap[`${currTeam}`] = table.length - 1;
      }
    });
    const homeRow = table[clubToIndexMap[`${homeTeam}`]];
    const awayRow = table[clubToIndexMap[`${awayTeam}`]];
    const hG = Number(match['fthg']);
    const aG = Number(match['ftag']);
    homeRow.mp++;
    awayRow.mp++;
    homeRow.gf += hG;
    homeRow.ga += aG;
    homeRow.gd = homeRow.gf - homeRow.ga;
    awayRow.ga += hG;
    awayRow.gf += aG;
    awayRow.gd = awayRow.gf - awayRow.ga;
    if (match['ftr'] === 'H') {
      homeRow.w++;
      homeRow.p += 3;
      awayRow.l++;
    } else if (match['ftr'] === 'A') {
      awayRow.w++;
      awayRow.p += 3;
      homeRow.l++;
    } else {
      homeRow.d++;
      homeRow.p++;
      awayRow.d++;
      awayRow.p++;
    }
  });
  table.sort((a, b) => {
    if (a.p > b.p) {
      return -1;
    } else if (a.p < b.p) {
      return 1;
    } else {
      if (a.gd > b.gd) {
        return -1;
      } else if (b.gd > a.gd) {
        return 1;
      } else {
        if (a.gf > b.gf) {
          return -1;
        } else if (a.gf < b.gf) {
          return 1;
        } else {
          return a.name.localeCompare(b.name);
        }
      }
    }
  });
  return table;
};
