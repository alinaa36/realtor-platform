import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  FormControl,
} from '@mui/material';
import axios from 'axios';
import { RealEstate } from '../../types/realEstate';

interface RealEstateListItemProps {
  key: string;
  realEstate: RealEstate;
  onClick: () => void;
  onDelete: (id: string) => Promise<void>;
  onUpdate: (updatedRealEstate: RealEstate) => void;
}

const RealEstateListItem: React.FC<RealEstateListItemProps> = ({
  realEstate,
  onDelete,
  onUpdate,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedRealEstate, setSelectedRealEstate] = useState<RealEstate | null>(null);
  const [updatedRealEstate, setUpdatedRealEstate] = useState<RealEstate | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleLearnMore = (realEstate: RealEstate) => {
    setSelectedRealEstate(realEstate);
    setModalOpen(true);
  };

  const handleEdit = (realEstate: RealEstate) => {
    setSelectedRealEstate(realEstate);
    setUpdatedRealEstate(realEstate);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedRealEstate(null);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setSelectedRealEstate(null);
    setUpdatedRealEstate(null);
    setFile(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (updatedRealEstate) {
      setUpdatedRealEstate({ ...updatedRealEstate, [name]: value });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    if (!selectedRealEstate || !updatedRealEstate) return;

    const data = {
      ...updatedRealEstate,
      photo: file ? await uploadPhoto(file) : updatedRealEstate.photo,
    };

    try {
      const response = await axios.patch(
        `http://localhost:3001/realestate/${selectedRealEstate.id}`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Real estate updated:', response.data);
      onUpdate(response.data);
      handleCloseEditModal();
    } catch (error) {
      console.error('Error updating real estate:', error);
    }
  };

  const uploadPhoto = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data.url; // Assuming the API returns the URL of the uploaded photo
    } catch (error) {
      console.error('Error uploading photo:', error);
      return updatedRealEstate?.photo || '';
    }
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, margin: '16px' }}>
        <CardMedia component="img" alt="Real Estate Image" height="140" image={realEstate.photo} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {realEstate.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {realEstate.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Estate Type: {realEstate.estateType}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => onDelete(realEstate.id)}>
            <DeleteIcon />
          </Button>
          <Button size="small" onClick={() => handleLearnMore(realEstate)}>
            Переглянути
          </Button>
          <Button size="small" onClick={() => handleEdit(realEstate)}>
            Редагувати
          </Button>
        </CardActions>
      </Card>
      {modalOpen && selectedRealEstate && (
        <Dialog open={modalOpen} onClose={handleCloseModal}>
          <DialogTitle>{selectedRealEstate.title}</DialogTitle>
          <DialogContent>
            <CardMedia component="img" alt="Real Estate Image" height="200" image={selectedRealEstate.photo} />
            <DialogContentText>
              <Typography variant="body1">Ціна: {selectedRealEstate.price}</Typography>
              <Typography variant="body1">Кількість кімнат: {selectedRealEstate.rooms}</Typography>
              <Typography variant="body1">Площа: {selectedRealEstate.square}</Typography>
              <Typography variant="body1">Поверх: {selectedRealEstate.floor}</Typography>
              <Typography variant="body1">Адреса: {selectedRealEstate.address}</Typography>
              <Typography variant="body1">Тип: {selectedRealEstate.estateType}</Typography>
              <Typography variant="body1">Опис: {selectedRealEstate.description}</Typography>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary">
              Закрити
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {editModalOpen && selectedRealEstate && (
        <Dialog open={editModalOpen} onClose={handleCloseEditModal}>
          <DialogTitle>Редагування</DialogTitle>
          <DialogContent>
            <FormControl fullWidth margin="dense">
              <TextField
                label="Опис"
                name="description"
                value={updatedRealEstate?.description || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Ціна"
                name="price"
                type="number"
                value={updatedRealEstate?.price || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Кількість кімнат"
                name="rooms"
                type="number"
                value={updatedRealEstate?.rooms || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Площа"
                name="square"
                type="number"
                value={updatedRealEstate?.square || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Поверх"
                name="floor"
                type="number"
                value={updatedRealEstate?.floor || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Адреса"
                name="address"
                value={updatedRealEstate?.address || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <TextField
                label="Тип"
                name="estateType"
                value={updatedRealEstate?.estateType || ''}
                onChange={handleInputChange}
                fullWidth
                margin="dense"
              />
              <input type="file" onChange={handleFileChange} />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseEditModal} color="primary">
              Закрити
            </Button>
            <Button onClick={handleSave} color="primary">
              Зберегти
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

export default RealEstateListItem;
