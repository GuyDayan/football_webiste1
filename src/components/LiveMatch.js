import '../css/livematches.css'
import {TeamLogo} from "./TeamLogo";

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
            <div className={'singleTeam'} style={team1style}><img src={TeamLogo.find(logo => logo.name ===  liveMatch.team1Name).src} style={{width:'40px',height:'40px'}} />
                <br/>
                {liveMatch.team1Name} <br/>
                {liveMatch.team1Goals}</div>
            &nbsp; VS &nbsp;
            <div className={'singleTeam'} style={team2style}>
                <img src={TeamLogo.find(logo => logo.name ===  liveMatch.team2Name).src} style={{width:'40px',height:'40px'}} />
                <br/>
                {liveMatch.team2Name}<br/>
                {liveMatch.team2Goals}</div>
        </div>
    );
}

export default LiveMatch;
