import React, {useState} from 'react';
import '../css/table.css'
import {useEffect} from "react";
import {getLiveTableRequest, sendApiGetRequest, sendApiGetRequestWithParams} from "../ApiRequests";
import {NavLink} from "react-router-dom";
import {TeamLogo} from "./TeamLogo";
import {calculateTeamsStats} from "./CalculateTeamStats";

function LiveTable() {
    const [sortedTable, setSortedTable] = useState([]);
    const [loggedIn, setLoggedIn] = useState(window.$userDetails.loggedIn);

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    async function fetchData() {
        getLiveTableRequest(
            { userId: window.$userDetails.userId, token: window.$userDetails.token },
            (response) => {
                let currentResponse = response.data;
                let currentTeamStats = currentResponse.teamStats;
                let sortedTable=calculateTeamsStats(currentTeamStats);
                setSortedTable(sortedTable)
            }
        );
    }






    return (
        <>
            {loggedIn ?

                <table>
                    <thead>
                    <tr>
                        <th>Logo</th>
                        <th>Name</th>
                        <th>Games</th>
                        <th>GF</th>
                        <th>GA</th>
                        <th>Wins</th>
                        <th>Loses</th>
                        <th>Draws</th>
                        <th>Balance</th>
                        <th>Points</th>
                    </tr>
                    </thead>
                    <tbody>
                    {sortedTable.map(item => (
                        <tr>
                            <td><img src={TeamLogo[item.id -1].src} style={{width: '30px', height: '30px'}} alt={''}/></td>
                            <td>{item.name}</td>
                            <td>{item.totalGames}</td>
                            <td>{item.goalsFor}</td>
                            <td>{item.goalsAgainst}</td>
                            <td>{item.numberOfWins}</td>
                            <td>{item.numberOfLoses}</td>
                            <td>{item.numberOfDraws}</td>
                            <td>{item.goalsBalance}</td>
                            <td>{item.points}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                : <div className={'pleaseLog'} >YOU MUST TO LOG IN TO SEE LIVE FEATURES
                    <br/>
                    <NavLink to={"/"}><button>NAVIGATE TO LOG IN</button></NavLink></div> }

        </>
    );
}

export default LiveTable;