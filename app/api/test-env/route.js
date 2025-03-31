// app/api/test-env/route.js
// app/api/test-api/route.js
// app/api/test-api/route.js
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api-football-v1.p.rapidapi.com/v3/leagues', {
      headers: {
        'X-RapidAPI-Key': process.env.FOOTBALL_API_KEY,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
      }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ 
        success: false, 
        status: response.status, 
        error: errorText 
      });
    }
    
    const data = await response.json();
    // Just return the first few items to avoid a huge response
    return NextResponse.json({ 
      success: true, 
      results: data.results,
      firstFew: data.response?.slice(0, 3) 
    });
    
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: error.message 
    });
  }
}