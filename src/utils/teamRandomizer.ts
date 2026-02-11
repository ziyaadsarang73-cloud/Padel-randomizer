function randomizeTeams(teamMembers) {
    // The snake-draft algorithm requires an even number of participants
    if (teamMembers.length % 2 !== 0) {
        throw new Error('Please provide an even number of team members.');
    }

    // Shuffle function using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const shuffledMembers = shuffle([...teamMembers]);
    const teams = [[], []]; // Two teams

    // Distribute members in snake-draft fashion
    for (let i = 0; i < shuffledMembers.length; i++) {
        const teamIndex = (i % 2 === 0) ? 0 : 1;
        teams[teamIndex].push(shuffledMembers[i]);
    }

    return teams;
}

// Example usage:
// const teams = randomizeTeams(['Alice', 'Bob', 'Charlie', 'David']);
// console.log(teams);