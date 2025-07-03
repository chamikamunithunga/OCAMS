import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Typography, Button, Box, TextField, MenuItem, List, ListItem, ListItemText } from '@mui/material';
import "../styles/custom.css";
import { db } from '../firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const doctors = [
  { value: 'dr_smith', label: 'Dr. Smith' },
  { value: 'dr_jones', label: 'Dr. Jones' },
  { value: 'dr_lee', label: 'Dr. Lee' },
];

const PatientDashboard = () => {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch appointments for this patient
  const fetchAppointments = async (name) => {
    setLoading(true);
    const q = query(collection(db, 'appointments'), where('patientName', '==', name));
    const querySnapshot = await getDocs(q);
    setAppointments(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    if (patientName) {
      fetchAppointments(patientName);
    }
  }, [patientName]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientName) {
      alert('Please enter your name to book an appointment.');
      return;
    }
    await addDoc(collection(db, 'appointments'), {
      patientName,
      doctor,
      date,
      reason,
    });
    setDoctor('');
    setDate('');
    setReason('');
    fetchAppointments(patientName);
    alert('Appointment booked!');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>Patient Dashboard</Typography>
      <Grid container spacing={3}>
        {/* Appointments Section */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>My Appointments</Typography>
            <Box sx={{ mt: 2 }}>
              {loading ? (
                <Typography>Loading...</Typography>
              ) : appointments.length === 0 ? (
                <Typography>No appointments yet.</Typography>
              ) : (
                <List>
                  {appointments.map((appt) => (
                    <ListItem key={appt.id} divider>
                      <ListItemText
                        primary={`${appt.date} with ${doctors.find(d => d.value === appt.doctor)?.label || appt.doctor}`}
                        secondary={appt.reason}
                      />
                    </ListItem>
                  ))}
                </List>
              )}
            </Box>
          </Paper>
        </Grid>
        {/* Book Appointment Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Book New Appointment</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Your Name"
                value={patientName}
                onChange={e => setPatientName(e.target.value)}
                required
                fullWidth
              />
              <TextField
                select
                label="Doctor"
                value={doctor}
                onChange={e => setDoctor(e.target.value)}
                required
                fullWidth
              >
                {doctors.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Date"
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required
                fullWidth
              />
              <TextField
                label="Reason"
                value={reason}
                onChange={e => setReason(e.target.value)}
                required
                fullWidth
                multiline
                minRows={2}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Book Appointment
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PatientDashboard; 