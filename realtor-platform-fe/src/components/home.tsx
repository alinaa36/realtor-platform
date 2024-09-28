import React from 'react';
import { Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      textAlign="center"
      sx={{
        backgroundImage: 'url(https://images.wallpaperscraft.ru/image/single/spalnaia_kvartira_liuks_25783_1920x1080.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        color: 'white',
        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
      }}
    >
      <Box
        sx={{
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)', 
          borderRadius: '10px',
        }}
      >
        <Typography 
          variant="h2" 
          gutterBottom 
          sx={{
            fontWeight: 'bold',
            fontSize: '3rem',
            '-webkit-text-stroke': '1px black', 
            '@media (max-width:600px)': {
              fontSize: '2rem',
            },
          }}
        >
          Рієлторська фірма
        </Typography>
      </Box>
    </Box>
  );
}

export default Home;
