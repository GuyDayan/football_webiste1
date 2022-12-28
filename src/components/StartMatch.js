import React, {useState , useEffect} from "react";
import '../css/startMatch.css'
import {sendApiGetRequest, sendApiGetRequestWithParams, sendApiPostRequest} from "../ApiRequests";
import NewMatch from "./NewMatch";


export function StartMatch(props) {
    const [team1IdSelected, setTeam1IdSelected] = useState(null);
    const [team2IdSelected, setTeam2IdSelected] = useState(null);
    const [teams, setTeams] = useState([]);
    const [liveMatches, setLiveMatches] = useState([]);
    const [liveMatchChangeFlag, setLiveMatchChangeFlag] = useState(false);
    const [currentErrorCode, setCurrentErrorCode] = useState('');
    const [showError, setShowError] = useState(false);
    const [showSuccessful, setShowSuccessful] = useState(false);
    const [errorList, setErrorList] = useState([
        {errorCode: 81, reason: "one of the teams already played"},
    ]);



    useEffect(() => {
        fetchTeams();
        fetchLiveMatches()
    }, []);


    async function fetchTeams() {
        let currentUserId = window.$userDetails.userId;
        let currentToken = window.$userDetails.token;
        sendApiGetRequestWithParams(
            "http://localhost:8989/get-teams?",
            { userId: currentUserId, token: currentToken },
            (response) => {
                let response1 = response.data;
                const teams = response1.teamList;
                setTeams(teams);
            }
        );
    }
    //
    async function fetchLiveMatches() {
        let currentUserId = window.$userDetails.userId;
        let currentToken = window.$userDetails.token;
        sendApiGetRequestWithParams(
            "http://localhost:8989/get-live-matches?",
            { userId: currentUserId, token: currentToken },
            (response) => {
                let getLiveMatchResponse = response.data;
                const liveMatches = getLiveMatchResponse.matches;
                setLiveMatches(liveMatches);
            }
        );
    }





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
                const newLiveMatchResponse = response.data
                if (newLiveMatchResponse.success){
                    const newMatch = newLiveMatchResponse.newMatch;
                    setLiveMatches((prevLiveMatches) => [...prevLiveMatches, newMatch]);
                    setCurrentErrorCode('')
                    setShowError(false)
                    setShowSuccessful(true)
                }else {
                    setCurrentErrorCode(newLiveMatchResponse.errorCode)
                    setShowError(true)
                    setShowSuccessful(false)
                }

            });
        }

    }

    function handleDelete(matchId) {
        setLiveMatches(item=> item.filter(match=>match.id !== matchId))
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
                </div>
                <div>
                    <select name="team2" style={{height: '20px'}} onChange={handleTeam2Options}>
                        <option value={''}>Select Team 2</option>
                        {
                            teams.filter(team => team.id !== team1IdSelected).map(team => (
                                <option key={team.id} value={team.name}>{team.name}</option>))
                        }
                    </select>

                </div>

                <div>
                    <button onClick={startNewMatch} disabled={(team1IdSelected===null || team2IdSelected === null)}>START LIVE MATCH</button>
                </div>
            </div>
            <div className={"matches"}>
                {liveMatches.length > 0 && liveMatches.map(newMatch => <NewMatch key={newMatch.id} newMatch={newMatch} onDelete={handleDelete}/>)}
            </div>
            <div>
                {showError === true  && currentErrorCode === 81 &&  "one of the teams already played"}
                {showSuccessful === true && "Match has been added successfully"}
            </div>
        </div>
    )
}