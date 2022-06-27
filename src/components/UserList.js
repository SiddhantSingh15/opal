import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Stack,
  Tooltip,
  Typography,
  IconButton,
} from "@mui/material";
import React, {useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import AuthForm from "./AuthForm";

export default function UserList() {
  const [addUser, setAddUser] = useState(false);

  const users = [
    { email: "test@gmail.com", type: "Admin" },
    { email: "test1@gmail.com", type: "Intern" },
    { email: "test2@gmail.com", type: "Senior Associate" },
    { email: "test3@gmail.com", type: "Lawyer" },
    { email: "test4@gmail.com", type: "Lawyer" },
    { email: "test5@gmail.com", type: "Lawyer" },
    { email: "test6@gmail.com", type: "Lawyer" },
    { email: "test7@gmail.com", type: "Admin" },
    { email: "test8@gmail.com", type: "Senior Associate" },
    { email: "test9@gmail.com", type: "Intern" },
  ];

  return (
    <Paper elevation={3} sx={{ marginTop: "30px", paddingBottom: "20px" }}>
      {/* <Login open={true} close={() => alert("close")}/> */}
      <AuthForm
        open={addUser}
        handleClose={() => setAddUser(false)}
        sx={{ zIndex: 1 }}
        signup
      />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ boxSizing: "border-box", paddingX: "20px" }}
      >
        <Typography marginTop={1} variant="h4" component="h1">
          Users
        </Typography>
        <Tooltip title="Add user">
          <IconButton sx={{ color: "green" }} onClick={() => setAddUser(true)}>
            <AddIcon fontSize="large" cursor="pointer" />
          </IconButton>
        </Tooltip>
      </Stack>
      <List sx={{ height: "200px", overflowY: "scroll", paddingX: "20px" }}>
        {users.map((user, index) => (
          <ListItem
            sx={{
              padding: "0",
              display: "flex",
              justifyContent: "space-between",
            }}
            key={index}
          >
            <Stack direction="row">
              <ListItemText sx={{ maxWidth: "300px", width: "300px" }} primary={user.email} />
              <ListItemText
                sx={{ marginLeft: "50px", color: "gray", fontStyle: "italic" }}
                primary={user.type}
              />
            </Stack>
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={0.5}
              width={50}
            >
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Tooltip enterDelay={500} title="Upgrade user">
                  <MilitaryTechIcon cursor="pointer" />
                </Tooltip>
              </ListItemIcon>
              <ListItemIcon sx={{ minWidth: "20px" }}>
                <Tooltip enterDelay={500} title="Remove user">
                  <PersonRemoveIcon cursor="pointer" />
                </Tooltip>
              </ListItemIcon>
            </Stack>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}
