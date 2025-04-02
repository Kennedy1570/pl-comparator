import { NextResponse } from "next/server";

export async function GET(requests) {
    const { searchParams} = new URL(requests.url);
    const playerID = searchParams.get('id')

    if(!playerID){
        return NextResponse.json(
            {error: 'Player ID is required'},
            {status: 400}
        )
    }

    try{
        const response = await fetch(`${process.env.FOOTBALL_API_URL}/players?league=39&season=2024`, {
        headers: {
            'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
            'x-rapidapi-host': 'api-football-v1.p.rapidapi.com'
        }
        })
        if(!response.ok) {
            throw new error (`${response.status}`)
        }
        const data = await response.json()

        if (!data.response || data.response.length === 0) {
            return NextResponse.json(
              { error: 'Player not found' },
              { status: 404 }
            );
          }
          
          const stats = data.response[0].statistics[0];
          
          return NextResponse.json({ statistics: stats });
        } catch (error) {
          console.error('Error fetching player statistics:', error);
          return NextResponse.json(
            { error: 'Failed to fetch player statistics' },
            { status: 500 }
          );
        }
}