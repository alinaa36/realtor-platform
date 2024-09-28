import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import axios from 'axios';
import UserListItem from './userListItem';
import UserDialog from './userDialog';
import EditUserDialog from './editUser';
import { User } from '../../types/user';

export default function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      let url = 'http://localhost:3001/user';
      const queryParams = [];
      if (filter !== 'ALL') {
        queryParams.push(`filter=${filter}`);
      }
      if (sortBy) {
        queryParams.push(`sort=${sortBy}`);
      }
      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      try {
        const response = await axios.get(url);
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [filter, sortBy]);

  const handleFilterChange = (event: SelectChangeEvent<string>) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortBy(event.target.value);
  };

  const handleListItemClick = (user: User) => {
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedUser(null);
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      await axios.delete(`http://localhost:3001/user/${userId}`);
      const updatedUsers = users.filter(u => u.id !== userId);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleSaveUser = (updatedUser: User) => {
    const updatedUsers = users.map(u => (u.id === updatedUser.id ? updatedUser : u));
    setUsers(updatedUsers);
  };

  return (
    <Box
      sx={{
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '16px',
        width: '100%',
        maxWidth: '400px',
        bgcolor: 'background.paper',
        margin: '16px auto'
      }}
    >
      <Typography variant="h6" component="div" sx={{ marginBottom: '16px' }}>
        Список користувачів
      </Typography>
      <FormControl fullWidth sx={{ marginBottom: '16px' }}>
        <InputLabel id="filter-label">Фільтр за роллю</InputLabel>
        <Select
          labelId="filter-label"
          id="filter-select"
          value={filter}
          onChange={handleFilterChange}
          label="Фільтр за роллю"
        >
          <MenuItem value="ALL">Всі ролі</MenuItem>
          <MenuItem value="CLIENT">Клієнт</MenuItem>
          <MenuItem value="REALTOR">Ріелтор</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ marginBottom: '16px' }}>
        <InputLabel id="sort-label">Сортувати за</InputLabel>
        <Select
          labelId="sort-label"
          id="sort-select"
          value={sortBy}
          onChange={handleSortChange}
          label="Сортувати за"
        >
          <MenuItem value="lastName">Прізвище</MenuItem>
          <MenuItem value="firstName">Ім'я</MenuItem>
        </Select>
      </FormControl>
      {users.map((user: User) => (
        <UserListItem
          key={user.id}
          user={user}
          onClick={() => handleListItemClick(user)}
          onDelete={handleDeleteUser}
          onEdit={handleEditUser}
        />
      ))}
      <UserDialog open={dialogOpen} onClose={handleCloseDialog} user={selectedUser || {} as User} />
      {selectedUser && (
        <EditUserDialog
          open={editDialogOpen}
          onClose={handleCloseEditDialog}
          user={selectedUser}
          onSave={handleSaveUser}
        />
      )}
    </Box>
  );
}
