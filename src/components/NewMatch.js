import React from 'react';

function NewMatch(props) {
    let match = props.match;
    return (
        <div>
            {match.team1.name} {match.team1.goals} vs {match.team2.name} {match.team2.goals}
        </div>
    );
}

export default NewMatch;