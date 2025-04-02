"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Container, Row, Col, Card, Table, Spinner, Button } from 'react-bootstrap';
import Link from 'next/link';

export default function ComparisonPage() {
  const searchParams = useSearchParams();
  const player1Id = searchParams.get('player1');
  const player2Id = searchParams.get('player2');
  
  const [playerData, setPlayerData] = useState({
    player1: null,
    player2: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayerStats() {
      setLoading(true);
      try {
        // Fetch stats for both players
        const response1 = await fetch(`/api/player-stats?id=${player1Id}`);
        const data1 = await response1.json();
        
        const response2 = await fetch(`/api/player-stats?id=${player2Id}`);
        const data2 = await response2.json();
        
        setPlayerData({
          player1: data1,
          player2: data2
        });
      } catch (error) {
        console.error('Error fetching player stats:', error);
      } finally {
        setLoading(false);
      }
    }
    
    if (player1Id && player2Id) {
      fetchPlayerStats();
    }
  }, [player1Id, player2Id]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" />
        <p>Loading comparison...</p>
      </Container>
    );
  }

  const { player1, player2 } = playerData;

  return (
    <Container className="my-4">
      <h1 className="text-center mb-4">Player Comparison</h1>
      
      <Row>
        <Col>
          <Card className="mb-4">
            <Card.Body>
              <Row>
                <Col xs={5} className="text-center">
                  {player1 && (
                    <div>
                      <img 
                        src={player1.photo} 
                        alt={player1.name}
                        className="rounded-circle"
                        style={{ maxWidth: '100px' }}
                      />
                      <h4>{player1.name}</h4>
                    </div>
                  )}
                </Col>
                <Col xs={2} className="text-center d-flex align-items-center justify-content-center">
                  <h3>VS</h3>
                </Col>
                <Col xs={5} className="text-center">
                  {player2 && (
                    <div>
                      <img 
                        src={player2.photo} 
                        alt={player2.name}
                        className="rounded-circle"
                        style={{ maxWidth: '100px' }}
                      />
                      <h4>{player2.name}</h4>
                    </div>
                  )}
                </Col>
              </Row>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header>
              <h3>Season Statistics</h3>
            </Card.Header>
            <Card.Body>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th>{player1?.name}</th>
                    <th>Statistic</th>
                    <th>{player2?.name}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{player1?.stats?.goals || 0}</td>
                    <td>Goals</td>
                    <td>{player2?.stats?.goals || 0}</td>
                  </tr>
                  <tr>
                    <td>{player1?.stats?.assists || 0}</td>
                    <td>Assists</td>
                    <td>{player2?.stats?.assists || 0}</td>
                  </tr>
                  <tr>
                    <td>{player1?.stats?.appearances || 0}</td>
                    <td>Appearances</td>
                    <td>{player2?.stats?.appearances || 0}</td>
                  </tr>
                  <tr>
                    <td>{player1?.stats?.minutes || 0}</td>
                    <td>Minutes</td>
                    <td>{player2?.stats?.minutes || 0}</td>
                  </tr>
                  <tr>
                    <td>{player1?.stats?.yellowCards || 0}</td>
                    <td>Yellow Cards</td>
                    <td>{player2?.stats?.yellowCards || 0}</td>
                  </tr>
                  <tr>
                    <td>{player1?.stats?.redCards || 0}</td>
                    <td>Red Cards</td>
                    <td>{player2?.stats?.redCards || 0}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          
          <div className="text-center mt-3">
            <Link href="/compare" passHref>
              <Button variant="primary">Back to Selection</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}