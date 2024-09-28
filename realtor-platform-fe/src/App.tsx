import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/home';
import Objects from './components/realEstates/objects';
import { Box, Tabs, Tab } from '@mui/material';
import { a11yProps } from './components/users/allyProp';
import CustomTabPanel from './components/tabPanel';
import Users from './components/users/users';

function App() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Router>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Головна" component={Link} to="/" {...a11yProps(0)} />
          <Tab label="Користувачі" component={Link} to="/users" {...a11yProps(1)} />
          <Tab label="Об'єкти" component={Link} to="/objects" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Routes>
        <Route path="/" element={<CustomTabPanel value={value} index={0}><Home /></CustomTabPanel>} />
        <Route path="/users" element={<CustomTabPanel value={value} index={1}><Users /></CustomTabPanel>} />
        <Route path="/objects" element={<CustomTabPanel value={value} index={2}><Objects /></CustomTabPanel>} />
      </Routes>
    </Router>
  );
}

export default App;
// import { useUser } from './main';
// import './App.css';
// import { Avatar, Box, Button, Divider, FormControl, InputLabel, List, ListItem, ListItemAvatar, ListItemText, MenuItem, Select, Switch, TextField, Typography } from '@mui/material';
// import React, { useState } from 'react';
// import UserList from './components/getUser';
// import CustomButton from './components/getUserButton';
// import axios from 'axios';
// import { Link, Route, Router, Routes } from 'react-router-dom';
// import Home from './components/home';
// import Objects from './components/objects';
// import Users from './components/users';


// function App() {

  


//   return (
//     <Router>
//       <div>
//         <nav>
//           <ul>
//             <li>
//               <Link to="/">Головна</Link>
//             </li>
//             <li>
//               <Link to="/users">Користувачі</Link>
//             </li>
//             <li>
//               <Link to="/objects">Об'єкти</Link>
//             </li>
//           </ul>
//         </nav>

//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/users" element={<Users />} />
//           <Route path="/objects" element={<Objects />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }
//     <Box
//       height={400}
//       width={300}
//       my={4}
//       display="flex"
//       flexDirection="column"
//       alignItems="center"
//       gap={2}
//       p={2}
//       sx={{ border: '2px solid grey' }}
//     >
//       <Typography variant="h6" gutterBottom>
//         Create User
//       </Typography>
//       <TextField
//         label="First Name"
//         name="firstName"
//         value={user.firstName}
//         onChange={handleChange}
//         fullWidth
//       />
//       <TextField
//         label="Last Name"
//         name="lastName"
//         value={user.lastName}
//         onChange={handleChange}
//         fullWidth
//       />
//       <TextField
//         label="Email"
//         name="email"
//         value={user.email}
//         onChange={handleChange}
//         fullWidth
//       />
//       <TextField
//         label="Phone"
//         name="phone"
//         value={user.phone}
//         onChange={handleChange}
//         fullWidth
//       />
//       <FormControl fullWidth>
//         <InputLabel>Role</InputLabel>
//         <Select
//           name="role"
//           value={user.role}
//           onChange={handleChange}
//         >
//           <MenuItem value="CLIENT">CLIENT</MenuItem>
//           <MenuItem value="REALTOR">REALTOR</MenuItem>
//         </Select>
//       </FormControl>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleSubmit}
//       >
//         Create User
//       </Button>
//     </Box>
//   );
// }

// const [showUserList, setShowUserList] = useState(false);

//   return (
//     <div>
//       <CustomButton onClick={() => setShowUserList(!showUserList)} showUserList={showUserList} />
//       {showUserList && <UserList />}
//     </div>
// );



// export default App;

