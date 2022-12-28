function LiveMatch(props) {
    let liveMatch = props.currentLiveMatch;
    let team1style={};
    let team2style={};
    if(liveMatch.team1Goals > liveMatch.team2Goals){
        team1style.color = 'green';
        team2style.color = 'red'
    }else {
        if(liveMatch.team2Goals > liveMatch.team1Goals){
            team1style.color = 'red';
            team2style.color = 'green'
        } else {
            team1style.color = 'yellow';
            team2style.color = 'yellow';
        }
    }


    return (
        <div className={'live-match'}>
            <div style={team1style}>{liveMatch.team1Name} <br/>
                {liveMatch.team1Goals}</div>
            &nbsp; VS &nbsp;
            <div style={team2style} >{liveMatch.team2Name}<br/>
                {liveMatch.team2Goals}</div>
        </div>
    );
}

export default LiveMatch;
