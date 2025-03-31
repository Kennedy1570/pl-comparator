"use client";

import React, {useState, useEffect} from 'react';
import { Form, Button, Container, Row, Col, Card, Spinner } from 'react-bootstrap';

export default function ComparePage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [loadingPlayers1, setLoadingPlayers1] = useState(false);
  const [loadingPlayers2, setLoadingPlayers2] = useState(false);
  const [teamId1, setTeamId1] = useState('');
  const [teamId2, setTeamId2] = useState('');
  const [players1, setPlayers1] = useState([]);
  const [players2, setPlayers2] = useState([]);
  const [selectedPlayer1, setSelectedPlayer1] = useState(null);
  const [selectedPlayer2, setSelectedPlayer2] = useState(null);

  useEffect(() => {
    async function fetchTeams() {
        setLoadingTeams(true);
        try {
            const response = await fetch('/api/teams');
            const data = await response.json()
            setTeams(data.teams || []);
        } catch (error) {
            console.error('Error fetching teams:', error);
        } finally {
            setLoadingTeams(false);
        }
    }
    fetchTeams(); //12ac4350cdmsh0aeddf16544fbb9p161f88jsn8dc61b131383
  }, [])

  const handleTeamChange1 = async(e) => {
    const newTeamId = e.target.value;
    setTeamId1(newTeamId);
    setSelectedPlayer1('');

    if(newTeamId) {
        setLoadingPlayers1(true);
        try {
            const response = await fetch(`/api/players?team=${newTeamId}`)
            const data = await response.json();
            setPlayers1(data.players);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setLoadingPlayers1(false);
        }
    } else {
          setPlayers1([]);
        }
  }
  

  const handleTeamChange2 = async (e) => {
    const newTeamId = e.target.value;
    setTeamId2(newTeamId);
    setSelectedPlayer2('');

    if(newTeamId) {
        setLoadingPlayers2(true);
        try {
            const response = await fetch(`/api/players?team=${newTeamId}`)
            const data = await response.json();
            setPlayers2(data.players);
        } catch (error) {
            console.error('Error fetching players:', error);
        } finally {
            setLoadingPlayers2(false);
        }
    } else {
          setPlayers2([]);
        }
    }

  const handlePlayerChange1 = (e) => {
    setSelectedPlayer1(e.target.value);
  };

  const handlePlayerChange2 = (e) => {
    setSelectedPlayer2(e.target.value);
  };

  const handleCompare = async () => {
    if (selectedPlayer1 && selectedPlayer2) {
      alert(`Ready to compare players with IDs: ${selectedPlayer1} and ${selectedPlayer2}`);
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-primary mb-4">Compare Players</h1>
      
      {loadingTeams ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading teams...</p>
        </div>
      ) : (
        <Row>
          <Col md={6} className="mb-4">
            <Card className="fpl-bg p-3">
              <h2>Player 1</h2>
              <Form.Group className="mb-3">
                <Form.Label>Select Team</Form.Label>
                <Form.Select 
                  value={teamId1}
                  onChange={handleTeamChange1}
                >
                  <option value="">Select a team</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              {loadingPlayers1 ? (
                <div className="text-center py-4">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                teamId1 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Player</Form.Label>
                      <Form.Select
                        value={selectedPlayer1}
                        onChange={handlePlayerChange1}
                        disabled={players1.length === 0}
                      >
                        <option value="">Select a player</option>
                        {players1.map(player => (
                          <option key={player.id} value={player.id}>
                            {player.name} ({player.position})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    {selectedPlayer1 && (
                      <div className="text-center mt-3">
                        <img 
                          src={players1.find(p => p.id.toString() === selectedPlayer1)?.photo}
                          alt="Player" 
                          className="rounded-circle"
                          style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                      </div>
                    )}
                  </>
                )
              )}
            </Card>
          </Col>
          
          <Col md={6} className="mb-4">
            <Card className="fpl-bg p-3">
              <h2>Player 2</h2>
              <Form.Group className="mb-3">
                <Form.Label>Select Team</Form.Label>
                <Form.Select 
                  value={teamId2}
                  onChange={handleTeamChange2}
                >
                  <option value="">Select a team</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
              
              {loadingPlayers2 ? (
                <div className="text-center py-4">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : (
                teamId2 && (
                  <>
                    <Form.Group className="mb-3">
                      <Form.Label>Select Player</Form.Label>
                      <Form.Select
                        value={selectedPlayer2}
                        onChange={handlePlayerChange2}
                        disabled={players2.length === 0}
                      >
                        <option value="">Select a player</option>
                        {players2.map(player => (
                          <option key={player.id} value={player.id}>
                            {player.name} ({player.position})
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    
                    {selectedPlayer2 && (
                      <div className="text-center mt-3">
                        <img 
                          src={players2.find(p => p.id.toString() === selectedPlayer2)?.photo}
                          alt="Player" 
                          className="rounded-circle"
                          style={{ maxWidth: '100px', maxHeight: '100px' }}
                        />
                      </div>
                    )}
                  </>
                )
              )}
            </Card>
          </Col>
        </Row>
      )}
      
      <div className="d-flex justify-content-center mt-4">
        <Button className="btn-success px-4 py-2" onClick={handleCompare} disabled={!selectedPlayer1 || !selectedPlayer2}>
          Compare Players
        </Button>
      </div>
    </Container>
  )

}
