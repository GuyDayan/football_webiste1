import React from 'react';
import TeamLogo from "../TeamLogo";
import {useEffect} from "react";
import {sendApiGetRequest} from "../ApiRequests";

function LiveTable() {
    let data;

    useEffect(() => {
        sendApiGetRequest("http://localhost:8989/get-live-table?", (response) => {
            data = response.data;

        })
    }, )


    return (
        <>
            <table>
                <thead>
                <tr>
                    <th> </th>
                    <th>Name</th>
                    <th>Wins</th>
                    <th>Loses</th>
                    <th>Draws</th>
                    <th>Points</th>
                </tr>
                </thead>
                <tbody>
                {data.map(item => (
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.numberOfWins}</td>
                        <td>{item.numberOfLoses}</td>
                        <td>{item.numberOfDraws}</td>
                        <td>{item.points}</td>
                    </tr>
                ))}
                </tbody>
            </table>

        </>
    );
}


export default LiveTable;