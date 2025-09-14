import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Users, Plus, Trash2, User, Mail, Phone, FileText } from 'lucide-react';
import axios from 'axios';

const HackathonRegistration = ({ onTeamRegistered }) => {
  const { user } = useContext(AuthContext);
  const [teamName, setTeamName] = useState('');
  const [leader, setLeader] = useState({
    name: '',
    email: '',
    mobile: '',
    registrationNumber: '',
    password: ''
  });
  const [members, setMembers] = useState([
    { name: '', email: '', mobile: '', registrationNumber: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const addMember = () => {
    if (members.length < 2) {
      setMembers([...members, { name: '', email: '', mobile: '', registrationNumber: '' }]);
    }
  };

  const removeMember = (index) => {
    if (members.length > 1) {
      setMembers(members.filter((_, i) => i !== index));
    }
  };

  const updateMember = (index, field, value) => {
    const updatedMembers = [...members];
    updatedMembers[index][field] = value;
    setMembers(updatedMembers);
  };

  const updateLeader = (field, value) => {
    setLeader({ ...leader, [field]: value });
  };

  const validateForm = () => {
    if (!teamName.trim()) {
      setError('Team name is required');
      return false;
    }

    if (!leader.name || !leader.email || !leader.mobile || !leader.registrationNumber || !leader.password) {
      setError('All leader fields are required');
      return false;
    }

    if (!leader.email.endsWith('@vitapstudent.ac.in')) {
      setError('Team leader must have a @vitapstudent.ac.in email address');
      return false;
    }

    if (leader.password.length < 8) {
      setError('Leader password must be at least 8 characters');
      return false;
    }

    for (let i = 0; i < members.length; i++) {
      const member = members[i];
      if (!member.name || !member.email || !member.mobile || !member.registrationNumber) {
        setError(`All fields for member ${i + 1} are required`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('/api/teams/register', {
        teamName,
        leader,
        members
      });

      setSuccess('Team registered successfully! You can now view your team details.');
      onTeamRegistered(response.data.team);
    } catch (error) {
      setError(error.response?.data?.message || 'Team registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="hackathon-registration">
      <div className="registration-header">
        <h2>Hackathon Team Registration</h2>
        <p>Register your team for Android club HAckathon. Team size: 2-3 members including leader.</p>
      </div>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        {/* Team Name */}
        <div className="form-section">
          <h3>Team Information</h3>
          <div className="form-group">
            <label htmlFor="teamName">Team Name</label>
            <div className="input-wrapper">
              <Users className="input-icon" size={20} />
              <input
                type="text"
                id="teamName"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                placeholder="Enter your team name"
                required
              />
            </div>
          </div>
        </div>

        {/* Team Leader */}
        <div className="form-section">
          <h3>Team Leader Details</h3>
          <div className="leader-note">
            <p><strong>Note:</strong> Team leader must have @vitapstudent.ac.in email and will use this password to login.</p>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>Full Name</label>
              <div className="input-wrapper">
                <User className="input-icon" size={20} />
                <input
                  type="text"
                  value={leader.name}
                  onChange={(e) => updateLeader('name', e.target.value)}
                  placeholder="Enter leader's name"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Email (@vitapstudent.ac.in)</label>
              <div className="input-wrapper">
                <Mail className="input-icon" size={20} />
                <input
                  type="email"
                  value={leader.email}
                  onChange={(e) => updateLeader('email', e.target.value)}
                  placeholder="leader@vitapstudent.ac.in"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mobile Number</label>
              <div className="input-wrapper">
                <Phone className="input-icon" size={20} />
                <input
                  type="tel"
                  value={leader.mobile}
                  onChange={(e) => updateLeader('mobile', e.target.value)}
                  placeholder="Enter mobile number"
                  maxLength="10"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label>Registration Number</label>
              <div className="input-wrapper">
                <FileText className="input-icon" size={20} />
                <input
                  type="text"
                  value={leader.registrationNumber}
                  onChange={(e) => updateLeader('registrationNumber', e.target.value)}
                  placeholder="Enter registration number"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Password (for login)</label>
            <div className="input-wrapper">
              <input
                type="password"
                value={leader.password}
                onChange={(e) => updateLeader('password', e.target.value)}
                placeholder="Create password (min 8 characters)"
                minLength="8"
                required
              />
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="form-section">
          <div className="section-header">
            <h3>Team Members</h3>
            {members.length < 2 && (
              <button type="button" className="add-member-btn" onClick={addMember}>
                <Plus size={16} />
                Add Member
              </button>
            )}
          </div>

          {members.map((member, index) => (
            <div key={index} className="member-card">
              <div className="member-header">
                <h4>Member {index + 1}</h4>
                {members.length > 1 && (
                  <button 
                    type="button" 
                    className="remove-member-btn"
                    onClick={() => removeMember(index)}
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <div className="input-wrapper">
                    <User className="input-icon" size={20} />
                    <input
                      type="text"
                      value={member.name}
                      onChange={(e) => updateMember(index, 'name', e.target.value)}
                      placeholder="Enter member's name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <div className="input-wrapper">
                    <Mail className="input-icon" size={20} />
                    <input
                      type="email"
                      value={member.email}
                      onChange={(e) => updateMember(index, 'email', e.target.value)}
                      placeholder="Enter member's email"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Mobile Number</label>
                  <div className="input-wrapper">
                    <Phone className="input-icon" size={20} />
                    <input
                      type="tel"
                      value={member.mobile}
                      onChange={(e) => updateMember(index, 'mobile', e.target.value)}
                      placeholder="Enter mobile number"
                      maxLength="10"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Registration Number</label>
                  <div className="input-wrapper">
                    <FileText className="input-icon" size={20} />
                    <input
                      type="text"
                      value={member.registrationNumber}
                      onChange={(e) => updateMember(index, 'registrationNumber', e.target.value)}
                      placeholder="Enter registration number"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="submit-btn large" disabled={loading}>
          {loading ? 'Registering Team...' : 'Register Team'}
        </button>
      </form>
    </div>
  );
};

export default HackathonRegistration;