import React, { useState, useEffect } from "react";
import axios from "axios";
import LeagueTable from "../components/LeagueTable";
import LeagueTopScorers from "../components/LeagueTopScorers";
import LeagueMatches from "../components/LeagueMatches";
import ViewsNavbar from "../components/ViewsNavbar";
import { leagues } from "../static/leagues";
import { seasons as seasonsArr, seasonIdx } from "../static/seasons";

const League = (props) => {
    const [tables, setTables] = useState(
        Array(leagues.length)
            .fill(0)
            .map(() =>
                Array(seasonsArr.length)
                    .fill(0)
                    .map(() => ({
                        isLoaded: false,
                        error: null,
                        table: [],
                    }))
            )
    );
    const [matchUps, setMatchUps] = useState(
        Array(leagues.length)
            .fill(0)
            .map(() => ({
                isLoaded: false,
                error: null,
                matches: [],
            }))
    );
    const [views, setViews] = useState(Array(leagues.length).fill("table"));
    const [seasons, setSeasons] = useState(
        Array(leagues.length).fill("2020-2021")
    );
    const league = props.leagueIdx;

    const populateTables = (table, idx, season, error) => {
        let newTables = tables.slice();
        newTables[idx][seasonIdx[season]] = {
            isLoaded: Boolean(!error),
            error,
            table,
        };
        setTables(newTables);
    };

    const populateMatchUps = (matches, idx, error) => {
        let newMatchUps = matchUps.slice();
        newMatchUps[idx] = {
            isLoaded: Boolean(!error),
            error,
            matches,
        };
        setMatchUps(newMatchUps);
    };

    const getMatchUpsData = async (idx) => {
        if (matchUps[idx].isLoaded) return;
        try {
            const response = await axios(
                `https://www.thesportsdb.com/api/v1/json/1/eventsnextleague.php?id=${leagues[idx].id}`
            );
            populateMatchUps(response.data.events, idx, null);
        } catch (error) {
            populateMatchUps(null, idx, error);
        }
    };

    const getTableData = async (idx, season) => {
        if (tables[idx][seasonIdx[season]].isLoaded) return;
        try {
            const response = await axios(
                `https://www.thesportsdb.com/api/v1/json/1/lookuptable.php?l=${leagues[idx].id}&s=${season}`
            );
            populateTables(response.data.table, idx, season, null);
        } catch (error) {
            populateTables(null, idx, season, error);
        }
    };

    const changeView = (view, idx) => {
        let newViews = views.slice();
        newViews[idx] = view;
        setViews(newViews);
    };

    const changeSeason = (season, idx) => {
        let newSeasons = seasons.slice();
        newSeasons[idx] = season;
        setSeasons(newSeasons);
    };

    useEffect(() => {
        if (views[league] === "table") {
            getTableData(league, seasons[league]);
        } else if (views[league] === "matches") {
            getMatchUpsData(league);
        }
    }, [league, views, seasons]);

    const view = views[league];
    const season = seasons[league];
    return (
        <div>
            <ViewsNavbar
                changeLeagueView={changeView}
                view={view}
                leagueIdx={league}
                season={season}
                changeSeason={(season, idx) => changeSeason(season, idx)}
            />
            {view === "table" && (
                <LeagueTable
                    tableData={tables[league][seasonIdx[season]]}
                    leagueIdx={league}
                    populateTables={populateTables}
                    season={season}
                />
            )}
            {view === "top-scorers" && (
                <LeagueTopScorers leagueIdx={league} season={season} />
            )}
            {view === "matches" && (
                <LeagueMatches
                    matchUps={matchUps[league]}
                    leagueIdx={league}
                    populateMatchUps={populateMatchUps}
                />
            )}
        </div>
    );
};

export default League;
