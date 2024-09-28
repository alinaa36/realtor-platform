import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import { User } from '../../types/user';
import { RealEstate } from '../../types/realEstate';

interface UserDialogProps {
  open: boolean;
  onClose: () => void;
  user: User;
}

const UserDialog: React.FC<UserDialogProps> = ({ open, onClose, user }) => {
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [selectedRealEstate, setSelectedRealEstate] = useState<RealEstate | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    if (user.id) {
      fetchRealEstates(user.id);
    }
  }, [user]);

  const fetchRealEstates = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:3001/realestate`, {
        params: { userId: userId },
      });
      setRealEstates(response.data);
    } catch (error) {
      console.error('Error fetching real estates:', error);
    }
  };

  const handleRealEstateClick = (realEstate: RealEstate) => {
    setSelectedRealEstate(realEstate);
    setDialogOpen(true);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Інформація про користувача</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Typography>Ім'я: {user.firstName}</Typography>
          <Typography>Прізвище: {user.lastName}</Typography>
          <Typography>
            Роль: {user.role === 'REALTOR' ? 'Рієлтор' : user.role === 'CLIENT' ? 'Клієнт' : user.role}
          </Typography>
          <Typography>Email: {user.email}</Typography>
          <Typography>Телефон: {user.phone}</Typography>
          {realEstates.length > 0 && (
            <>
              <Typography>Об'єкти:</Typography>
              <List>
                {realEstates.map((property, id) => (
                  <ListItem key={id} button onClick={() => handleRealEstateClick(property)}>
                    <ListItemText primary={`Ціна: ${property.price}`} secondary={`Адреса: ${property.address}`} />
                  </ListItem>
                ))}
              </List>
            </>
          )}
        </DialogContentText>
      </DialogContent>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Дані про нерухомість</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Typography variant="body1">Ціна: {selectedRealEstate?.price}</Typography>
            <Typography variant="body1">Кількість кімнат: {selectedRealEstate?.rooms}</Typography>
            <Typography variant="body1">Площа: {selectedRealEstate?.square}</Typography>
            <Typography variant="body1">Поверх: {selectedRealEstate?.floor}</Typography>
            <Typography variant="body1">Адреса: {selectedRealEstate?.address}</Typography>
            <Typography variant="body1">Тип: {selectedRealEstate?.estateType}</Typography>
            <Typography variant="body1">Опис: {selectedRealEstate?.description}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Закрити
          </Button>
        </DialogActions>
      </Dialog>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Закрити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserDialog;
