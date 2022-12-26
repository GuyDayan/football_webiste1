import React,{useState} from "react";
import '../css/startMatch.css'
import {useEffect} from "react";
import axios from "axios";
import {sendApiGetRequest, sendApiGetRequestWithParams, sendApiPostRequest} from "../ApiRequests";

export function StartMatch(props){
    const [team1Selected, setTeam1Selected] = useState('');
    const [team2Selected, setTeam2Selected] = useState('');
    const [teams, setTeams] = useState([]);
    const [team1Score, setTeam1Score] = useState('0');
    const [team2Score, setTeam2Score] = useState('0');
    const [newMatches, setNewMatches] = useState([]);

    useEffect(() => {
        let currentUserId=window.$userDetails.userId;
        let currentToken=window.$userDetails.token;
        sendApiGetRequestWithParams("http://localhost:8989/get-teams?",{userId:currentUserId, token:currentToken}, (response) => {
            let response1 = response.data;
            const teams = response1.teamList;
            setTeams(teams)

        })},[newMatches])


    const handleTeam1Options =(event)=> {
        let team1 = event.target.value;
        setTeam1Selected(team1);
        console.log(team1Selected);
    }
    const handleTeam2Options =(event)=> {
        setTeam2Selected(event.target.value)
    }



    const startNewMatch=()=> {
        sendApiPostRequest("http://localhost:8989/add-new-live-match?", {
            team1Id: team1Selected.id,
            team2Id: team2Selected.id,
            userId: window.$userDetails.userId,
            token: window.$userDetails.token
        }, (response) => {
            let newMatch = response.data.newMatch;
            let allMatches = newMatches;
            allMatches.push(newMatch);
            setNewMatches(allMatches);
        });
    }



    return(
        <div className={"startMatch"}>
            <div>
                <select name="team1" style={{height:'20px'}} value={team1Selected.name} onChange={handleTeam1Options}>
                    {
                        teams.map(team => <option key={team.name} value={team}>{team.name}</option>)
                    }
                </select>
            {/*<input value={team1Score} onChange={event => setTeam1Score(event.target.value)}/>*/}
            </div>
            <div>
                <select name="team2" style={{height:'20px'}}  onChange={handleTeam2Options}>
                    {
                        teams.map(team => <option value={team}>{team.name}</option>)
                    }
                </select>

            {/*<input value={team2Score} onChange={(event => setTeam2Score(event.target.value))}/>*/}
            </div>

            <div>
           <button onClick={startNewMatch}>START LIVE MATCH</button>
            </div>
            {newMatches.length}
            <div>{team1Selected}</div>
             </div>
    )
}