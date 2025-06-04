import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Link } from '@mui/material';
import logo from 'src/assets/images/logo.png'

import admin1 from 'src/assets/images/admin1.png'
import suitcase1 from 'src/assets/images/suitcase1.png'
import farmer1 from 'src/assets/images/farmer1.png'


import { BsSuitcaseLg } from 'react-icons/bs';


const roles = [
  {
    label: 'Admin',
    icon: admin1,
    link: 'https://ufarmx-staging.vercel.app/',
  },
  {
    label: 'Partner',
    icon: suitcase1,
    link: 'https://ufarmx-business.vercel.app/login',
  },
  {
    label: 'Farmer',
    icon: farmer1,
    link: 'https://ufarmx-farmer.vercel.app/login',
  },
];

export default function RoleSelectionPage() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: '#fff',
        position:"reklative",
        p: 2,
        fontFamily: 'Poppins',
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4,position:"absolute",top:"4rem",left:"22rem" }}>
        <img src={logo} alt="ufarmx logo" style={{ height: 40 }} />
      </Box>

      {/* Instruction Text */}
      <Typography
        variant="p"
        sx={{
          fontFamily: 'Poppins',
          marginBottom: "2rem",
          textAlign: 'center',
          color: '#333',
          maxWidth: '35%',
          
        }}
      >
        Select your role to access the appropriate dashboard and features
      </Typography>

      {/* Role Cards */}
      <Grid container spacing={4} justifyContent="center">
        {roles.map((role) => (
          <Grid item key={role.label}>
            <Link
              href={role.link}
              target="_blank"
              underline="none"
              rel="noopener noreferrer"
            >
              <Card
                sx={{
                  width: 220, // smaller square (approx 50% smaller)
                  height: 220,
                  borderRadius: '1rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  textAlign: 'center',
                  cursor: 'pointer',
                  border:  '2px solid transparent',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    border: '2px solid #90C434',
                  },
                }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontFamily: 'Poppins',
                  }}
                >
                  <Box
                    sx={{
                      fontSize: '1.4rem',
                      mb: 1,
                      backgroundColor: "#f0fcea" /*'#90C43433'*/, // Correct 20% opacity of #90C434
                      padding: '0.2rem',
                      paddingLeft:"0.4rem",
                      paddingRight:"0.4rem",
                      borderRadius: '50%',
                    }}
                  >
                    <img src={role.icon} alt="ufarmx icon" style={{ height: 25 }} />
                  </Box>
                  <Typography
                    variant="p"
                    sx={{
                      fontFamily: 'Poppins',
                      fontSize: '0.95rem',
                      color: '#0B3C32',
                    }}
                  >
                    {role.label}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}