import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Box} from "@mui/material";
import Collapse from "@mui/material/Collapse";
import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const Restapi = () => {
  const [user, setUser] = useState([]);
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [update, setUpdate] = useState({});
  const [open, setOpen] = useState(false);
  const [opentable, setOpentable] = useState(false);
  
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const fetchData = () => {
    axios
      .get("http://localhost:3000/users")
      .then((response) => {
        console.log("data", response.data);
        setUser(response.data);
      })
      .catch((err) => console.log("error", err));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const Adduser = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/users", {
        username,
        password,
        })
      .then(() => {
        setUserName("");
        setPassword("");
      })
      .catch((err) => console.log("error", err))
      .finally(() => {
        fetchData();
      });
  };
  const handleupdate = (item) => {
    console.log("item", item);
    setUpdate(item);
    setOpen(true);
  };

  const handledelete = (id) => {
    console.log("id", id);
    axios.delete(`http://localhost:3000/users/${id}`).finally(() => {
      fetchData();
    });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e) => {
    setUpdate({ ...update, [e.target.name]: e.target.value });
    console.log("e", e.target.name);
  };

  const handleSubmit = (id) => {
  axios
      .put(`http://localhost:3000/users/${update.id}`, update)
      .finally(() => {
        fetchData();
      });
    setOpen(false);
  };

  return (
   
    <div>
     <TableContainer
        component={Paper}
        sx={{ maxHeight: "850px" }}
        className="w-80"
      >
         <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Typography>update</Typography>
            <input
              type="text"
              value={update.username}
              name="username"
              placeholder="Enter your username"
              onChange={handleChange}
            ></input>
            <input
              type="text"
              value={update.password}
              name="password"
              placeholder="Enter your password"
              onChange={handleChange}
            ></input>
           <button onClick={handleSubmit}>submit</button>
          </Box>
        </Modal> 
        <Table
          sx={{ minWidth: "450px" }}
          aria-label="simple table"
          stickyHeader
          className="mt-2"
        >
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>username</TableCell>
              <TableCell>password</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((item, i) => {
              return (
                <>
                  <TableRow key={i}>
                    <TableCell>
                      {item.id}
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpentable(!opentable)}
                      >
                        {open ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell> 
                    <TableCell>{item.username}</TableCell>
                    <TableCell>{item.password}</TableCell>

                    <Button onClick={(e) => handleupdate(item)}>Update</Button>
                    <Button onClick={() => handledelete(item.id)}>
                      Delete
                    </Button>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Collapse in={opentable} timeout="auto">
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField
        className="mt-5 ms-5"
        id={username}
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TextField
        className="mt-5 ms-5"
        id={password}
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="mt-5 ms-5" onClick={Adduser}>
        Add
      </Button>
    </div>
  );
};

export default Restapi;
