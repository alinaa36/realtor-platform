import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import axios from 'axios';
import { User } from '../../types/user';

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
  onSave: (user: User) => void;
}

const EditUserDialog: React.FC<EditUserDialogProps> = ({ open, onClose, user, onSave }) => {
  const [formData, setFormData] = useState<User>(user);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    try {
      const response = await axios.patch(`http://localhost:3001/user/${formData.id}`, formData);
      onSave(response.data);
      onClose();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Змінити дані </DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Role"
          name="role"
          value={formData.role}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрити
        </Button>
        <Button onClick={handleSave} color="primary">
          Зберегти
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
