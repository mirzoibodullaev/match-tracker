
export interface Team {
    name: string;
    place: number;
    players: [
        {
            username: string;
            kills: number;
        },
        {
            username: string;
            kills: number;
        },
        {
            username: string;
            kills: number;
        }
    ];
    points: number;
    total_kills: number;
}

export interface Match {
    status: string;
    time: string;
    title: string;
    homeTeam: Team;
    awayTeam: Team;
    homeScore: number;
    awayScore: number;
}