import { NextResponse } from 'next/server';


// This is a mock function - in reality, you would use your football API key
export async function GET() {
    try{
        console.log('API Key available:', !!process.env.FOOTBALL_API_KEY);
        // In production, you would fetch from the actual API:
        const response = await fetch(`${process.env.FOOTBALL_API_URL}/teams?league=39&season=2024`, {
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
            { error: 'Failed to fetch team data' },
            { status: 500 }
        );
    }
}