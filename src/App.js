import React, { useState } from "react";
import LeaguesNavbar from "./components/LeaguesNavbar";
import League from "./components/League";

const App = () => {
    const [currLeague, setCurrLeague] = useState(0);

    return (
        <div>
            <LeaguesNavbar changeLeague={(idx) => setCurrLeague(idx)} />
            <League leagueIdx={currLeague} />
        </div>
    );
};

export default App;
