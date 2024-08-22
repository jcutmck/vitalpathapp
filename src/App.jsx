import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Tooltip, CircularProgress } from '@mui/material';

// Assuming XMLCclRequest is available in the global scope
// declare const XMLCclRequest: any;

const MilestoneCircle = styled(Box)(({ theme, status, state }) => ({
  width: 20,
  height: 20,
  borderRadius: '50%',
  margin: theme.spacing(0, 1),
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: '2px solid',
  borderColor: status === 'overdue' ? theme.palette.error.main : theme.palette.primary.main,
  backgroundColor: status === 'complete' ? theme.palette.success.main : 'transparent',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  ...(status === 'in_progress' && {
    background: `linear-gradient(to top, ${theme.palette.primary.main} 50%, transparent 50%)`,
  }),
  ...(state === 'disabled' && {
    display: 'none',
  }),
}));

const MilestoneTracker = () => {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating data fetch on component mount
    fetchMilestones();
  }, []);

  const fetchMilestones = () => {
    // Simulated XMLCclRequest
    // In reality, you would use the XMLCclRequest here to fetch data
    setTimeout(() => {
      const mockMilestones = [
        { id: 1, name: 'Visit Activated', status: 'complete', state: 'required', sequence: 1, details: 'Patient Arrival', date: 'Arrived 2024-08-01' },
        { id: 2, name: 'Patient Placement', status: 'complete', state: 'required', sequence: 2, details: 'Patient Bedded', date: '2024-08-01' },
        { id: 3, name: 'LOS Assessment', status: 'in_progress', state: 'required', sequence: 3, details: 'Assessment in Progress', date: '2024-08-15' },
        { id: 4, name: 'Development', status: 'requested', state: 'dynamic', sequence: 4, details: 'Development phase', date: '2024-09-01' },
        { id: 5, name: 'Consults', status: 'requested', state: 'dynamic', sequence: 5, details: 'Physical Therapy Requested', date: '2024-09-15' },
        { id: 6, name: 'Diagnosis', status: 'requested', state: 'required', sequence: 6, details: 'No Diagnosis Assigned', date: '2024-10-01' },
        { id: 7, name: 'Discharge Readiness', status: 'requested', state: 'dynamic', sequence: 7, details: 'Not Medically Cleared', date: '2024-09-15' },
      ];
      setMilestones(mockMilestones);
      setLoading(false);
    }, 1000);
  };

  const handleMilestoneClick = (milestone) => {
    console.log(`Milestone ${milestone.name} clicked`);
    // Here you would typically trigger actions in your proprietary software
    // For example: triggerProprietaryAction(milestone.id);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
      {milestones
        .filter(m => m.state !== 'disabled')
        .sort((a, b) => a.sequence - b.sequence)
        .map((milestone) => (
          <Tooltip
            key={milestone.id}
            title={`${milestone.name}: ${milestone.details} (Due: ${milestone.date})`}
            arrow
          >
            <MilestoneCircle
              status={milestone.status}
              state={milestone.state}
              onClick={() => handleMilestoneClick(milestone)}
            />
          </Tooltip>
        ))}
    </Box>
  );
};

export default MilestoneTracker;