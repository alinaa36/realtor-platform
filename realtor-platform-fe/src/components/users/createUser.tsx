import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Snackbar,
  Alert,
} from "@mui/material";
import axios from "axios";
import { User } from "../../types/user";

interface CreateUserFormProps {
  handleClose: () => void;
  updateUserList: (newUser: User) => void;
}

function CreateUserForm({ handleClose, updateUserList }: CreateUserFormProps) {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "CLIENT",
  });

  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleRoleChange = (event: SelectChangeEvent<string>) => {
    setUser({ ...user, role: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3001/user", user);
      console.log("User created:", response.data);
      setSuccessMessage("Користувач успішно створений");
      setUser({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "CLIENT",
      });
      setErrorMessage("");
      setSnackbarMessage("Користувач успішно створений");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("Помилка створення користувача");
      setSuccessMessage("");
      setSnackbarMessage("Помилка створення користувача");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100%"
      mx="auto"
      maxWidth={400}
      p={2}
      onSubmit={handleSubmit}
    >
      <TextField
        label="First Name"
        name="firstName"
        value={user.firstName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required // Make the field required
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={user.lastName}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required // Make the field required
      />
      <TextField
        label="Email"
        name="email"
        value={user.email}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required // Make the field required
      />
      <TextField
        label="Phone"
        name="phone"
        value={user.phone}
        onChange={handleChange}
        fullWidth
        sx={{ mb: 2 }}
        required // Make the field required
      />
      <FormControl fullWidth sx={{ mb: 2 }} required>
        {" "}
        {/* Make the field required */}
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          name="role"
          value={user.role}
          onChange={handleRoleChange}
        >
          <MenuItem value="CLIENT">CLIENT</MenuItem>
          <MenuItem value="REALTOR">REALTOR</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" color="primary" type="submit" fullWidth>
        Створити користувача
      </Button>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default CreateUserForm;
