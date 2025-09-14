import React from 'react';
import { Download, Calendar, Users, Crown, User } from 'lucide-react';
import jsPDF from 'jspdf';

const TeamDetails = ({ team }) => {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(20);
    doc.setFont(undefined, 'bold');
    doc.text('VIT Hackathon 2025', 105, 20, { align: 'center' });
    doc.text('Team Registration Certificate', 105, 35, { align: 'center' });
    
    doc.setFontSize(14);
    doc.setFont(undefined, 'normal');
    doc.text(`Team ID: ${team.teamId}`, 20, 60);
    doc.text(`Team Name: ${team.teamName}`, 20, 75);
    doc.text(`Total Members: ${team.totalMembers}`, 20, 90);
    doc.text(`Registration Date: ${new Date(team.registrationDate).toLocaleDateString()}`, 20, 105);
    
    doc.setFont(undefined, 'bold');
    doc.text('Team Leader:', 20, 130);
    doc.setFont(undefined, 'normal');
    doc.text(`Name: ${team.leader.name}`, 25, 145);
    doc.text(`Email: ${team.leader.email}`, 25, 160);
    doc.text(`Mobile: ${team.leader.mobile}`, 25, 175);
    doc.text(`Registration No: ${team.leader.registrationNumber}`, 25, 190);
    
    doc.setFont(undefined, 'bold');
    doc.text('Team Members:', 20, 215);
    doc.setFont(undefined, 'normal');
    
    let yPos = 230;
    team.members.forEach((member, index) => {
      doc.text(`Member ${index + 1}:`, 25, yPos);
      doc.text(`Name: ${member.name}`, 30, yPos + 15);
      doc.text(`Email: ${member.email}`, 30, yPos + 30);
      doc.text(`Mobile: ${member.mobile}`, 30, yPos + 45);
      doc.text(`Registration No: ${member.registrationNumber}`, 30, yPos + 60);
      yPos += 80;
    });
    
    doc.setFontSize(10);
    doc.text('This is an auto-generated certificate for Android club hackathon 2025', 105, 280, { align: 'center' });
    
    doc.save(`VIT_Hackathon_2025_${team.teamId}.pdf`);
  };

  return (
    <div className="team-details">
      <div className="team-header">
        <div className="team-title">
          <h2>{team.teamName}</h2>
          <p className="team-id">Team ID: <strong>{team.teamId}</strong></p>
        </div>
        <button className="download-btn" onClick={generatePDF}>
          <Download size={20} />
          Download Certificate
        </button>
      </div>

      <div className="team-info-grid">
        <div className="info-card">
          <div className="info-icon">
            <Users size={24} />
          </div>
          <div className="info-content">
            <h4>Team Size</h4>
            <p>{team.totalMembers} members</p>
          </div>
        </div>

        <div className="info-card">
          <div className="info-icon">
            <Calendar size={24} />
          </div>
          <div className="info-content">
            <h4>Registration Date</h4>
            <p>{new Date(team.registrationDate).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      <div className="members-section">
        <h3>Team Members</h3>
        
        {/* Team Leader */}
        <div className="member-card leader">
          <div className="member-header">
            <div className="member-avatar">
              <Crown size={20} />
            </div>
            <div className="member-info">
              <h4>{team.leader.name}</h4>
              <span className="member-role">Team Leader</span>
            </div>
          </div>
          <div className="member-details">
            <div className="detail-item">
              <span className="label">Email:</span>
              <span className="value">{team.leader.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Mobile:</span>
              <span className="value">{team.leader.mobile}</span>
            </div>
            <div className="detail-item">
              <span className="label">Reg No:</span>
              <span className="value">{team.leader.registrationNumber}</span>
            </div>
          </div>
        </div>

        {/* Team Members */}
        {team.members.map((member, index) => (
          <div key={index} className="member-card">
            <div className="member-header">
              <div className="member-avatar">
                <User size={20} />
              </div>
              <div className="member-info">
                <h4>{member.name}</h4>
                <span className="member-role">Member {index + 1}</span>
              </div>
            </div>
            <div className="member-details">
              <div className="detail-item">
                <span className="label">Email:</span>
                <span className="value">{member.email}</span>
              </div>
              <div className="detail-item">
                <span className="label">Mobile:</span>
                <span className="value">{member.mobile}</span>
              </div>
              <div className="detail-item">
                <span className="label">Reg No:</span>
                <span className="value">{member.registrationNumber}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDetails;