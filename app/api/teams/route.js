import { NextResponse } from 'next/server';

export async function GET() {
    const mockTeams = [
        { id: 42, name: "Arsenal", logo: "https://media.api-sports.io/football/teams/42.png" },
        { id: 33, name: "Manchester United", logo: "https://media.api-sports.io/football/teams/33.png" },
        { id: 40, name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
        { id: 49, name: "Chelsea", logo: "https://media.api-sports.io/football/teams/49.png" },
        { id: 50, name: "Manchester City", logo: "https://media.api-sports.io/football/teams/50.png" },
        { id: 47, name: "Tottenham", logo: "https://media.api-sports.io/football/teams/47.png" }
    ];
    
    try{
        if (!process.env.FOOTBALL_API_KEY) {
            console.warn('FOOTBALL_API_KEY not found in environment variables. Using fallback data.');
            return NextResponse.json({ teams: mockTeams });
        }

        console.log('API Key available:', !!process.env.FOOTBALL_API_KEY);
        const apiUrl = process.env.FOOTBALL_API_URL || 'https://api-football-v1.p.rapidapi.com/v3';
        const response = await fetch(`${apiUrl}/teams?league=39&season=2024`, {
        headers: {
            'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
        });

        if(!response.ok){
            const errorText = await response.text();
            console.error(`API response error: Status ${response.status}, Body: ${errorText}`);
            throw new Error(`API return status ${response.status}`);
        }
        
        const data = await response.json();

        const teams = data.response.map(item => ({
            id: item.team.id,
            name: item.team.name,
            logo: item.team.logo
        }));
        return NextResponse.json({teams})
    } catch (error) {
        console.error('Error fetching players:', error);
        return NextResponse.json(
            { teams: fallbackTeams, error: 'Using fallback data due to API error' },
            { status: 200 }
        );
    } 
}