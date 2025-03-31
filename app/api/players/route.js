import { NextResponse } from "next/server";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get('team');
  
    if (!teamId) {
        return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
        );
    }

    try{
        const response = await fetch(`${process.env.FOOTBALL_API_URL}/players?league=39&season=2024`, {
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