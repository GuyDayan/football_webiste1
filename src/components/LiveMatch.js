import React from 'react';
import "../css/livematches.css"

function LiveMatch(props) {
    let liveMatch = props.currentLiveMatch;
    return (
        <div className={'live-match'}>
            <div>{liveMatch.team1Name} {liveMatch.team1Goals}</div> Vs
            <div>{liveMatch.team2Name} {liveMatch.team2Goals}</div>
        </div>
    );
}

export default LiveMatch;