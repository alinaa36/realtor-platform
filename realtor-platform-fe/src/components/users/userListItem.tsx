import React from 'react';
import { ListItem, ListItemText, Typography, IconButton, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import EditIcon from '@mui/icons-material/Edit';
import { User } from '../../types/user';

interface UserListItemProps {
  user: User;
  onClick: () => void;
  onDelete: (userId: string) => void;
  onEdit: (user: User) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({ user, onClick, onDelete, onEdit }) => {
  return (
    <>
      <ListItem alignItems="flex-start" button onClick={onClick}>
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography sx={{ display: 'inline' }} component="span" variant="body2" color="text.primary">
                {user.firstName} {user.lastName}
              </Typography>
            </React.Fragment>
          }
        />
        <IconButton onClick={(e) => { e.stopPropagation(); onDelete(user.id); }} aria-label="Delete">
          <DeleteIcon />
        </IconButton>
        <IconButton onClick={(e) => { e.stopPropagation(); onEdit(user); }} aria-label="Edit">
          <EditIcon />
        </IconButton>
        <IconButton onClick={(e) => { e.stopPropagation(); onClick(); }} aria-label="User Info">
          <DensityMediumIcon />
        </IconButton>
      </ListItem>
      <Divider />
    </>
  );
};

export default UserListItem;
