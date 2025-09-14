import express from 'express';
import Team from '../models/Team.js';
import User from '../models/User.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Generate team ID
const generateTeamId = (mobile) => {
  const timestamp = Date.now().toString().slice(-6);
  const mobileLastThree = mobile.slice(-3);
  return `TEAM${timestamp}${mobileLastThree}`;
};

// Register team
router.post('/register', authenticateToken, async (req, res) => {
  try {
    const { teamName, leader, members } = req.body;
    const userId = req.userId;

    // Validate team lead email
    if (!leader.email.endsWith('@vitapstudent.ac.in')) {
      return res.status(400).json({ 
        message: 'Team leader must have a @vitapstudent.ac.in email address' 
      });
    }

    // Validate team size
    const totalMembers = members.length + 1; // +1 for leader
    if (totalMembers < 2 || totalMembers > 3) {
      return res.status(400).json({ 
        message: 'Team must have 2-3 members including the leader' 
      });
    }

    // Check if user is already a team leader
    const existingTeam = await Team.findOne({ leaderId: userId });
    if (existingTeam) {
      return res.status(400).json({ message: 'You are already registered as a team leader' });
    }

    // Generate team ID
    const teamId = generateTeamId(leader.mobile);

    // Create team
    const team = new Team({
      teamId,
      teamName,
      leaderId: userId,
      leader,
      members,
      totalMembers
    });

    await team.save();

    // Update user as team lead
    await User.findByIdAndUpdate(userId, { isTeamLead: true });

    res.status(201).json({
      message: 'Team registered successfully',
      team: {
        teamId: team.teamId,
        teamName: team.teamName,
        totalMembers: team.totalMembers,
        registrationDate: team.registrationDate
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get team details
router.get('/my-team', authenticateToken, async (req, res) => {
  try {
    const team = await Team.findOne({ leaderId: req.userId }).populate('leaderId', 'name email mobile');
    
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    res.json({ team });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;