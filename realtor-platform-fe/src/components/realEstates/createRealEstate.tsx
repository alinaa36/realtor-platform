import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import axios from "axios";

interface CreateRealEstateFormProps {
  handleClose: () => void;
  open: boolean;
}

interface FormData {
  price: string;
  rooms: string;
  square: string;
  floor: string;
  address: string;
  estateType: "PRIVATE" | "PUBLIC";
  description: string;
  photo: File | null;
  firstName: string;
  lastName: string;
}

const CreateRealEstateForm: React.FC<CreateRealEstateFormProps> = ({
  handleClose,
  open,
}) => {
  const initialFormData: FormData = {
    price: "",
    rooms: "",
    square: "",
    floor: "",
    address: "",
    estateType: "PRIVATE",
    description: "",
    photo: null,
    firstName: "",
    lastName: "",
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [photoUploaded, setPhotoUploaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: SelectChangeEvent<"PRIVATE" | "PUBLIC">) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value as "PRIVATE" | "PUBLIC",
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData({
      ...formData,
      photo: file,
    });
    if (file) {
      setPhotoUploaded(true);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userId = await getUserIdByName(formData.firstName, formData.lastName);

    if (!userId) {
      setErrorMessage("User not found");
      return;
    }

    if (!formData.photo) {
      setErrorMessage("Please select a photo");
      return;
    }

    try {
      const data = new FormData();
      data.append("price", formData.price);
      data.append("rooms", formData.rooms);
      data.append("square", formData.square);
      data.append("floor", formData.floor);
      data.append("address", formData.address);
      data.append("estateType", formData.estateType);
      data.append("description", formData.description);
      if (formData.photo) {
        data.append("file", formData.photo);
      }
      data.append("userId", userId);

      const response = await axios.post(
        "http://localhost:3001/realestate",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Real estate created:", response.data);
      setSuccessMessage("Real estate created successfully");
      setFormData(initialFormData); // Clear form fields
      setPhotoUploaded(false);
    } catch (error: any) {
      console.error("Error creating real estate:", error);
      setErrorMessage(
        error.response?.data?.message || error.message || "Unknown error"
      );
    }
  };

  const getUserIdByName = async (
    firstName: string,
    lastName: string
  ): Promise<string | null> => {
    try {
      const response = await axios.get(
        `http://localhost:3001/user?name=${firstName}&lastName=${lastName}`
      );
      if (response.data && response.data.length > 0) {
        return response.data[0].id;
      }
    } catch (error) {
      console.error("There was an error fetching the user ID!", error);
    }
    return null;
  };

  const handleCloseSnackbar = () => {
    setErrorMessage(null);
    setSuccessMessage(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <DialogContent style={{ height: "400px", overflowY: "auto" }}>
        <TextField
          label="Ціна"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
          required
        />
        <TextField
          label="Кількість кімнат"
          name="rooms"
          type="number"
          value={formData.rooms}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
          required
        />
        <TextField
          label="Площа"
          name="square"
          type="number"
          value={formData.square}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
          required
        />
        <TextField
          label="Поверх"
          name="floor"
          type="number"
          value={formData.floor}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
          required
        />
        <TextField
          label="Адреса"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Опис"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <FormControl fullWidth margin="normal" required>
          <InputLabel>Тип</InputLabel>
          <Select
            name="estateType"
            value={formData.estateType}
            onChange={handleSelectChange}
          >
            <MenuItem value="PRIVATE">PRIVATE</MenuItem>
            <MenuItem value="PUBLIC">PUBLIC</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ mt: 2 }}
        >
          Завантажити фото
          <input
            type="file"
            hidden
            onChange={handleFileChange}
            required
          />
        </Button>
        {photoUploaded && <Typography variant="body1">Фото було завантажене</Typography>}
        <TextField
          label="Ім'я"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Прізвище"
          name="lastName"
          value={formData.lastName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Закрити
        </Button>
        <Button type="submit" color="primary">
          Створити
        </Button>
      </DialogActions>
      {errorMessage && (
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "90%" }}
        >
          {errorMessage}
        </Alert>
      )}
      {successMessage && (
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "90%" }}
        >
          {successMessage}
        </Alert>
      )}
    </form>
  );
};

export default CreateRealEstateForm;
