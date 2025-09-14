import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import HackathonRegistration from './HackathonRegistration';
import TeamDetails from './TeamDetails';
import { LogOut, Users, Trophy } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('register');
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTeamDetails();
  }, []);

  const fetchTeamDetails = async () => {
    if (!user.isTeamLead) return;
    
    setLoading(true);
    try {
      const response = await axios.get('/api/teams/my-team');
      setTeam(response.data.team);
      setActiveTab('team');
    } catch (error) {
      console.log('No team found');
    } finally {
      setLoading(false);
    }
  };

  const handleTeamRegistered = (newTeam) => {
    setTeam(newTeam);
    setActiveTab('team');
    // Update user context to reflect team lead status
    user.isTeamLead = true;
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <div className="welcome-section">
            <h1>Welcome back, {user.name}!</h1>
            <p>Ready to dominate VIT Hackathon 2025?</p>
          </div>
          <button className="logout-btn" onClick={logout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      <div className="dashboard-nav">
        <button 
          className={`nav-btn ${activeTab === 'register' ? 'active' : ''}`}
          onClick={() => setActiveTab('register')}
          disabled={user.isTeamLead && team}
        >
          <Users size={20} />
          Team Registration
        </button>
        {(user.isTeamLead || team) && (
          <button 
            className={`nav-btn ${activeTab === 'team' ? 'active' : ''}`}
            onClick={() => setActiveTab('team')}
          >
            <Trophy size={20} />
            My Team
          </button>
        )}
      </div>

      <div className="dashboard-content">
        {activeTab === 'register' && !team && (
          <HackathonRegistration onTeamRegistered={handleTeamRegistered} />
        )}
        {activeTab === 'team' && team && (
          <TeamDetails team={team} />
        )}
        {activeTab === 'register' && team && (
          <div className="already-registered">
            <div className="success-card">
              <Trophy size={48} />
              <h3>Team Already Registered!</h3>
              <p>You have successfully registered your team for VIT Hackathon 2024.</p>
              <button 
                className="view-team-btn"
                onClick={() => setActiveTab('team')}
              >
                View Team Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;