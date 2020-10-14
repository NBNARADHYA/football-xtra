import React from "react";
import LeagueTable from "../components/LeagueTable";
import LeagueTopScorers from "../components/LeagueTopScorers";
import LeagueMatches from "../components/LeagueMatches";
import ViewsNavbar from "../components/ViewsNavbar";
import { leagues } from "../static/leagues";
import { seasons, seasonIdx } from "../static/seasons";

class League extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tables: Array(leagues.length)
                .fill(0)
                .map(() =>
                    Array(seasons.length)
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
            views: Array(leagues.length).fill("table"),
            seasons: Array(leagues.length).fill("2020-2021"),
        };
    }

    populateTables(data, idx, season) {
        this.setState((prevState) => {
            let newTables = prevState.tables.slice();
            newTables[idx][seasonIdx[season]] = data;
            return { tables: newTables };
        });
    }

    populateMatchUps(data, idx) {
        this.setState((prevState) => {
            let newMatchUps = prevState.matchUps.slice();
            newMatchUps[idx] = data;
            return { matchUps: newMatchUps };
        });
    }

    changeView(view, idx) {
        this.setState((prevState) => {
            let newViews = prevState.views.slice();
            newViews[idx] = view;
            return {
                views: newViews,
            };
        });
    }

    changeSeason(season, idx) {
        this.setState((prevState) => {
            let newSeasons = prevState.seasons.slice();
            newSeasons[idx] = season;
            return { seasons: newSeasons };
        });
    }

    render() {
        const { leagueIdx } = this.props;
        const view = this.state.views[leagueIdx];
        const season = this.state.seasons[this.props.leagueIdx];
        return (
            <div>
                <ViewsNavbar
                    changeLeagueView={(view, idx) => this.changeView(view, idx)}
                    view={view}
                    leagueIdx={leagueIdx}
                    season={season}
                    changeSeason={(season, idx) =>
                        this.changeSeason(season, idx)
                    }
                />
                {view === "table" && (
                    <LeagueTable
                        tableData={
                            this.state.tables[leagueIdx][seasonIdx[season]]
                        }
                        leagueIdx={leagueIdx}
                        populateTables={(data, idx, season) =>
                            this.populateTables(data, idx, season)
                        }
                        season={season}
                    />
                )}
                {view === "top-scorers" && (
                    <LeagueTopScorers leagueIdx={leagueIdx} season={season} />
                )}
                {view === "matches" && (
                    <LeagueMatches
                        matchUps={this.state.matchUps[leagueIdx]}
                        leagueIdx={leagueIdx}
                        populateMatchUps={(data, idx) =>
                            this.populateMatchUps(data, idx)
                        }
                    />
                )}
            </div>
        );
    }
}

export default League;
