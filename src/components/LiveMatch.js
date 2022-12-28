import React from 'react';
import "../css/livematches.css"

function LiveMatch(props) {
    let liveMatch = props.currentLiveMatch;
    return (
        <div className={'live-match'}>
            <div>{liveMatch.team1Name} <br/> {liveMatch.team1Goals}</div>
            &nbsp;
            <div>Vs</div>
            &nbsp;
            <div>{liveMatch.team2Name} <br/>  {liveMatch.team2Goals}</div>
        </div>
    );
}

export default LiveMatch;