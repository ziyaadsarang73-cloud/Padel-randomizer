// src/types/index.ts

interface Player {
    id: number;
    name: string;
    age: number;
    ranking: number;
}

interface Team {
    id: number;
    name: string;
    players: Player[];
}

interface Match {
    id: number;
    teamA: Team;
    teamB: Team;
    score: string;
    date: string;
}