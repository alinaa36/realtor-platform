import React, { useState } from 'react';
import { Box, Button, Modal, Typography } from '@mui/material';
import UserList from './getUser';
import { User } from '../../types/user';
import CreateUserForm from './createUser';

function Users() {
  const [showUserList, setShowUserList] = useState(false);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleShowUserList = () => setShowUserList(prevState => !prevState); // Toggle showUserList state

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={4}>
      <Typography variant="h4" gutterBottom>
        Управління користувачами
      </Typography>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleShowUserList}> {/* Update onClick handler */}
          {showUserList ? 'Приховати всіх користувачів' : 'Показати всіх користувачів'}
        </Button>
      </Box>
      <Box mb={2}>
        <Button variant="outlined" onClick={handleOpen}>
          Створити нового користувача
        </Button>
      </Box>
      {showUserList && <UserList />} {/* Ensure UserList is imported correctly and rendered */}
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
            Створити нового користувача
          </Typography>
          <CreateUserForm handleClose={handleClose} updateUserList={function (newUser: User): void {
            throw new Error('Function not implemented.');
          } } />
        </Box>
      </Modal>
    </Box>
  );
}

export default Users;