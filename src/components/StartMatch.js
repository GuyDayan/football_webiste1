import React, {useState , useEffect} from "react";
import '../css/startMatch.css'
import axios from "axios";
import {sendApiGetRequest, sendApiGetRequestWithParams, sendApiPostRequest} from "../ApiRequests";
import UpdateLiveMatch from "./UpdateLiveMatch";


export function StartMatch(props) {
    const [team1IdSelected, setTeam1IdSelected] = useState(null);
    const [team2IdSelected, setTeam2IdSelected] = useState(null);
    const [teams, setTeams] = useState([]);
    const [team1Score, setTeam1Score] = useState('0');
    const [team2Score, setTeam2Score] = useState('0');
    const [liveMatches, setLiveMatches] = useState('');
    const [liveMatchChangeFlag, setLiveMatchChangeFlag] = useState(false);

    useEffect(() => {
        let currentUserId = window.$userDetails.userId;
        let currentToken = window.$userDetails.token;
        sendApiGetRequestWithParams("http://localhost:8989/get-teams?", {userId: currentUserId, token: currentToken}, (response) => {
            let response1 = response.data;
            const teams = response1.teamList;
            setTeams(teams)
        })

        sendApiGetRequestWithParams("http://localhost:8989/get-live-matches?", {userId: currentUserId, token: currentToken}, (response) => {
            let getLiveMatchResponse = response.data;
            const liveMatches = getLiveMatchResponse.matches;
            setLiveMatches(liveMatches)
        })


    }, [liveMatchChangeFlag])


    const handleTeam1Options = (event) => {
        const value = event.target.value;
        const item = teams.find(item => item.name === value);
        setTeam1IdSelected(item.id)
    }
    const handleTeam2Options = (event) => {
        const value = event.target.value;
        const item = teams.find(item => item.name === value);
        setTeam2IdSelected(item.id)
    }


    const startNewMatch = () => {
        if ((team1IdSelected !== null) || (team2IdSelected !== null)) {
            sendApiPostRequest("http://localhost:8989/add-new-live-match?", {
                team1Id: team1IdSelected,
                team2Id: team2IdSelected,
                userId: window.$userDetails.userId,
                token: window.$userDetails.token
            }, (response) => {
                const newMatch = response.data.newMatch;
                setLiveMatches(liveMatches.concat(newMatch));
            });
        }
    }

    const handleUpdateMatchList =()=>{
        setLiveMatchChangeFlag(!liveMatchChangeFlag)
    }


    return (
        <div className={"outer"}>
        <div className={"startMatch"}>
            <div>
                <select name="team1" style={{height: '20px'}} onChange={handleTeam1Options}>
                    <option value={''}>Select Team 1</option>
                    {
                        teams.filter(team => team.id !== team2IdSelected).map(team => (
                            <option key={team.id} value={team.name}>{team.name}</option>))
                    }
                </select>
                {/*<input value={team1Score} onChange={event => setTeam1Score(event.target.value)}/>*/}
            </div>
            <div>
                <select name="team2" style={{height: '20px'}} onChange={handleTeam2Options}>
                    <option value={''}>Select Team 2</option>
                    {
                        teams.filter(team => team.id !== team1IdSelected).map(team => (
                            <option key={team.id} value={team.name}>{team.name}</option>))
                    }
                </select>

                {/*<input value={team2Score} onChange={(event => setTeam2Score(event.target.value))}/>*/}
            </div>

            <div>
                <button onClick={startNewMatch} disabled={(team1IdSelected===null || team2IdSelected === null)}>START LIVE MATCH</button>
            </div>
        </div>
            <div className={"matches"}>
            {liveMatches.length > 0 && liveMatches.map(newMatch => <UpdateLiveMatch newMatch={newMatch} updateLiveMatchesList={handleUpdateMatchList}/>)}   {/* check if there is new matches and render the exsits  */}
            </div>

        </div>
    )
}