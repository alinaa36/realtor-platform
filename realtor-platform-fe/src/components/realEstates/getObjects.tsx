import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { RealEstate } from '../../types/realEstate';
import RealEstateListItem from './realEstateListItem';
import { Box, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, TextField, Button } from '@mui/material';

interface RealEstateListProps {
  realEstate: RealEstate[];
}

const RealEstateList: React.FC<RealEstateListProps> = ({ realEstate }) => {
  const [realEstates, setRealEstates] = useState<RealEstate[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    rooms: '',
    price: '',
    estateType: '',
    userId: ''
  });
  const [sortOption, setSortOption] = useState<string>('');
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    fetchRealEstates();
    fetchUsers();
  }, [filterOptions, sortOption]);

  const fetchRealEstates = async () => {
    try {
      const params: any = {};
      if (filterOptions.rooms !== '') params.rooms = filterOptions.rooms;
      if (filterOptions.price !== '') params.price = filterOptions.price;
      if (filterOptions.estateType !== '') params.estateType = filterOptions.estateType;
      if (filterOptions.userId !== '') params.userId = filterOptions.userId;
      if (sortOption !== '') params.sort = sortOption;
  
      const response = await axios.get('http://localhost:3001/realestate', { params });
      setRealEstates(response.data);
    } catch (error) {
      console.error('Error fetching real estates:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/user');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3001/realestate/${id}`);
      setRealEstates(realEstates.filter(realEstate => realEstate.id !== id));
    } catch (error) {
      console.error('Error deleting real estate:', error);
    }
  };

  const handleListItemClick = (realEstate: RealEstate) => {
    console.log('Real Estate clicked:', realEstate);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name as string]: value,
    });
  };

  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFilterOptions({
      ...filterOptions,
      [name]: value,
    });
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value);
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '100%',
        maxWidth: '800px',
        margin: '16px auto',
        backgroundColor: '#f7f7f7'
      }}
    >
      <Typography variant="h6" component="div" sx={{ marginBottom: '16px', color: '#333' }}>
        Список нерухомості
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: '16px' }}>
        <InputLabel id="filter-estate-type-label">Фільтрувати за типом</InputLabel>
        <Select
          labelId="filter-estate-type-label"
          id="filter-estate-type-select"
          name="estateType"
          value={filterOptions.estateType}
          onChange={handleSelectChange}
          label="Фільтрувати за типом"
          sx={{ backgroundColor: '#fff' }}
        >
          <MenuItem value="">Всі типи</MenuItem>
          <MenuItem value="PRIVATE">Приватні</MenuItem>
          <MenuItem value="PUBLIC">Публічні</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '16px' }}>
        <InputLabel id="sort-label">Сортувати за</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortOption}
          onChange={handleSortChange}
          label="Сортувати за"
          sx={{ backgroundColor: '#fff' }}
        >
          <MenuItem value="">Без сортування</MenuItem>
          <MenuItem value="rooms">Кількість кімнат</MenuItem>
          <MenuItem value="price">Ціна</MenuItem>
          <MenuItem value="square">Площа</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Кількість кімнат"
        name="rooms"
        type="number"
        value={filterOptions.rooms}
        onChange={handleTextFieldChange}
        fullWidth
        margin="normal"
        inputProps={{ min: 1 }}
      />
      <TextField
        label="Фільтрувати за ціною"
        variant="outlined"
        name="price"
        value={filterOptions.price}
        onChange={handleTextFieldChange}
        fullWidth
        sx={{ marginBottom: '16px' }}
      />
      <FormControl fullWidth sx={{ marginBottom: '16px' }}>
        <InputLabel id="filter-user-id-label">Фільтрувати за користувачем</InputLabel>
        <Select
          labelId="filter-user-id-label"
          id="filter-user-id-select"
          name="userId"
          value={filterOptions.userId}
          onChange={handleSelectChange}
          label="Фільтрувати за користувачем"
          sx={{ backgroundColor: '#fff' }}
        >
          <MenuItem value="">Всі користувачі</MenuItem>
          {users.map(user => (
            <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
          ))}
        </Select>
      </FormControl>
      {realEstates.map((realEstate) => (
        <RealEstateListItem
          key={realEstate.id}
          realEstate={realEstate}
          onClick={() => handleListItemClick(realEstate)}
          onDelete={handleDelete}
          onUpdate={(updatedRealEstate: RealEstate) => {
            setRealEstates(realEstates.map(re => re.id === updatedRealEstate.id ? updatedRealEstate : re));
          }}
        />
      ))}
    </Box>
  );
}
export default RealEstateList;
