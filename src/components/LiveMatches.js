import React, {useContext, useState} from 'react';
import "../css/livematches.css"
import {useEffect} from "react";
import {sendApiGetRequest, sendApiGetRequestWithParams} from "../ApiRequests";
import LiveMatch from "./LiveMatch";
import NewMatch from "./NewMatch";


function LiveMatches() {
    const [liveMatches, setLiveMatches] = useState([])
    const [teams, setTeams] = useState([]);
    const [liveTableUpdateFlag, setLiveTableUpdateFlag] = useState(false);
    const [loggedIn, setLoggedIn] = useState(window.$userDetails.loggedIn);


    useEffect(() => {
        if (loggedIn) {
            sendApiGetRequestWithParams("http://localhost:8989/get-teams?", {
                userId: window.$userDetails.userId,
                token: window.$userDetails.token
            }, (response) => {
                let response1 = response.data;
                const teams = response1.teamList;
                setTeams(teams);
            })

        }
    }, [])

    useEffect(() => {
        fetchData()
        return () => {
            const interval = setInterval(() => {
            }, 5000);
            return () => clearInterval(interval);
        };
    }, []);

    async function fetchData(){
        sendApiGetRequestWithParams("http://localhost:8989/get-live-matches?", {
            userId: window.$userDetails.userId,
            token: window.$userDetails.token
        }, (response) => {
            let getLiveMatchResponse = response.data;
            const liveMatches = getLiveMatchResponse.matches;
            console.log("here")
            setLiveMatches(liveMatches)
        })

    }



    const getCurrentLiveMatch = (match) => {
        let team1Id = match.team1.id;
        let team2Id = match.team2.id;
        let team1Goals = match.team1_goals;
        let team2Goals = match.team2_goals;
        let team1 = teams.find(t => t.id === team1Id)
        let team2 = teams.find(t => t.id === team2Id)
        let team1Name = team1.name
        let team2Name = team2.name
        const currentMatch = {team1Name, team2Name, team1Goals, team2Goals}
        return currentMatch;
    }

    return (
        <div className={'all-matches'}>
            {loggedIn ? liveMatches.length > 0 ? liveMatches.map(match => <LiveMatch currentLiveMatch={getCurrentLiveMatch(match)}/>) : 'No live matches yet' : 'Pls logged in first' }
        </div>
    );
}

export default LiveMatches;