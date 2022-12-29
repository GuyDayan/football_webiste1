export const calculateTeamsStats = (currentTeamStats) => {
    const sorted =  currentTeamStats.slice().sort((team1, team2) => {
        if (team1.points === team2.points) {
            if (team1.goalsBalance === team2.goalsBalance) {
                return team1.name > team2.name ? -1 : 1;
            }
            return team1.goalsBalance > team2.goalsBalance ? -1 : 1;
        }
        return team1.points > team2.points ? -1 : 1;
    })
    return (sorted)
}