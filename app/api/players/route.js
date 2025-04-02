import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('team');
    
    const playersByTeam = {
        '42': [ // Arsenal
            { id: 1, name: 'Bukayo Saka', position: 'RW', photo: 'https://media.api-sports.io/football/players/1461.png' },
            { id: 2, name: 'Martin Ødegaard', position: 'CAM', photo: 'https://media.api-sports.io/football/players/1460.png' },
            // Add more players
        ],
        '33': [ // Manchester United
            { id: 3, name: 'Bruno Fernandes', position: 'CAM', photo: 'https://media.api-sports.io/football/players/3476.png' },
            { id: 4, name: 'Marcus Rashford', position: 'LW', photo: 'https://media.api-sports.io/football/players/3477.png' },
            // Add more players
        ],
        // Add more teams
    };
    
    /*const players = playersByTeam[teamId] || [];
    return NextResponse.json({ players });*/
    
    if (!teamId) {
        return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
        );
    }

    try{
        const apiUrl = process.env.FOOTBALL_API_URL || 'https://api-football-v1.p.rapidapi.com/v3';
        const response = await fetch(`${apiUrl}/players?league=39&season=2024`, {
        headers: {
            'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
        })

        if(!response.ok) {
            throw new Error(`API return status ${response.status}`)
        }

        const data = await response.json();
        const players = data.response.map(item => ({
            id: item.player.id,
            name: item.player.name,
            position: item.statistics[0]?.games?.position || 'Unknown',
            photo: item.player.photo
        }))
        return NextResponse.json({players})
    } catch (error) {
        console.error('Error fetching players:', error);
        return NextResponse.json(
          { error: 'Failed to fetch players data' },
          { status: 500 }
        );
    }
}