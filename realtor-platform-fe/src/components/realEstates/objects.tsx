import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import axios from 'axios';

import { RealEstate } from '../../types/realEstate';
import RealEstateList from './getObjects';
import CreateRealEstateForm from './createRealEstate';

function Objects() {
  const [showObjectList, setShowObjectList] = useState(false);
  const [open, setOpen] = useState(false);
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShowObjectList = async () => {
    setShowObjectList((prevState) => !prevState);
    if (!showObjectList) {
      try {
        const response = await axios.get('http://localhost:3001/realestate');
        setRealEstates(response.data);
      } catch (error) {
        console.error('Error fetching real estates:', error);
      }
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Управління об'єктами
      </Typography>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleShowObjectList}>
          {showObjectList ? "Приховати всі об'єкти" : "Показати всі об'єкти"}
        </Button>
      </Box>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleOpen}>
          Створити новий об'єкт
        </Button>
      </Box>
      {showObjectList && <RealEstateList realEstate={realEstates} />}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Створити новий об'єкт
          </Typography>
          <CreateRealEstateForm handleClose={handleClose} open={open} />
        </Box>
      </Modal>
    </Box>
  );
}

export default Objects;
