import React, {createContext, useState} from 'react';
import {sendApiPostRequest} from "../ApiRequests";

function NewMatch(props) {

    let currentNewMatch = props.newMatch;
    const [team1Goals, setTeam1Goals] = useState(currentNewMatch.team1_goals);
    const [team2Goals, setTeam2Goals] = useState(currentNewMatch.team2_goals);



    function updateMatchScore() {
        sendApiPostRequest("http://localhost:8989/update-match?", {
            matchId: currentNewMatch.id,
            team1Goals: team1Goals,
            team2Goals: team2Goals,
            userId: window.$userDetails.userId,
            token: window.$userDetails.token,
        }, (response) => {

        });

    }

    function endMatch() {
        props.onDelete(currentNewMatch.id);
        sendApiPostRequest("http://localhost:8989/end-match?", {
            matchId: currentNewMatch.id,
            userId: window.$userDetails.userId,
            token: window.$userDetails.token
        }, (response) => {
        });

    }

    return (
        <div className={'new-match'}>
            {currentNewMatch.team1.name}
            <input value={team1Goals} onChange={e => setTeam1Goals(e.target.value)}/>
            <div>Vs</div>
            {currentNewMatch.team2.name}
            <input value={team2Goals} onChange={e=> setTeam2Goals(e.target.value)}/>
            <button onClick={updateMatchScore}>Update</button>
            <button onClick={endMatch}>End</button>

        </div>
    );
}

export default NewMatch;