# Football Player Comparison App

A Next.js application that allows users to compare football player statistics from the Premier League.

## Live Demo
- https://main.d2a3yjhzag3tu4.amplifyapp.com/

## Features

- Select teams from the Premier League
- Choose players from selected teams
- Compare detailed player statistics side-by-side
- Responsive design for mobile and desktop viewing
- Real-time data from Football API

## Technologies Used

- **Next.js**: React framework with App Router for both server and client components
- **React Bootstrap**: UI component library for responsive design
- **Football API**: Real-time football statistics
- **AWS Amplify**: Hosting and deployment platform

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/football-player-comparison.git
   cd football-player-comparison
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory with your API credentials:
   ```
   FOOTBALL_API_KEY=your_api_key_here
   FOOTBALL_API_URL=https://api-football-v1.p.rapidapi.com/v3
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Integration

The app uses the Football API to fetch data for:
- Premier League teams
- Players by team
- Player statistics

The API implementation includes fallback data to ensure the app functions even when the API is unavailable.

## Project Structure

- `/app` - Next.js App Router pages and components
- `/app/api` - API routes for server-side API calls
- `/app/compare` - Player selection page
- `/app/comparison` - Player comparison results page
- `/public` - Static assets

## Deployment

The project is configured for deployment on AWS Amplify. The `amplify.yml` file includes the build configuration with environment variable handling.

1. Set up your AWS Amplify project and connect it to your repository
2. Add the environment variables in the Amplify Console
3. Deploy the application

## Future Improvements

- Add historical comparison of players across seasons
- Implement player search functionality
- Add more detailed statistical visualizations
- Support for comparing players across different leagues

## License

[MIT](LICENSE)

## Acknowledgements

- Football data provided by [Football API](https://www.api-football.com/)
- Built with [Next.js](https://nextjs.org/)
- Styled with [React Bootstrap](https://react-bootstrap.github.io/)
