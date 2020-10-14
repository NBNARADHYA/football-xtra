import React from "react";
import { Card } from "react-bootstrap";
import { weekDays } from "../static/weekDays";

const getDate = (timeStamp) => {
    const d = new Date(timeStamp);
    return `${
        weekDays[d.getDay()]
    }, ${d.getDate()}/${d.getMonth()} at ${d.getHours()}:${d.getMinutes()} IST`;
};

const LeagueMatches = (props) => {
    const { error, isLoaded, matches } = props.matchUps;
    const style1 = { position: "fixed", top: "50%", left: "50%" };

    if (error)
        return <div style={style1}>Sorry, Unable to fetch the matches</div>;

    if (!isLoaded) {
        const style = { position: "fixed", top: "40%", left: "37%" };
        return (
            <img
                style={style}
                src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
                alt="Loading..."
            />
        );
    }

    const matchesDisplay = matches.map((match, index) => {
        return (
            <Card key={index} border="secondary" className="text-center ">
                <Card.Header>Matchday {match.intRound}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        {match.strHomeTeam} vs {match.strAwayTeam}
                    </Card.Text>
                </Card.Body>
                <Card.Footer>{getDate(match.strTimestamp)}</Card.Footer>
            </Card>
        );
    });

    return <div>{matchesDisplay}</div>;
};

export default LeagueMatches;
