import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from "@mui/material";

import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  // DELETE function
  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this?")) {
      alert(`Todo with ID ${id} deleted`);
      // later: axios.delete(...)
    }
  };

  // Fetch Data
  useEffect(() => {
    axios
      .get("http://localhost:3000/")
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" sx={{ mb: 3 }}>
        ToDo List
      </Typography>

      {/* ADD BUTTON */}
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button variant="contained" component={Link} to="/create">
          Add +
        </Button>
      </Box>

      {/* TABLE */}
      <TableContainer component={Paper}>
        <Table>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow>
              <TableCell><b>Title</b></TableCell>
              <TableCell><b>Description</b></TableCell>
              <TableCell><b>Priority</b></TableCell>
              <TableCell><b>isCompleted</b></TableCell>
              <TableCell><b>order_index</b></TableCell>
              <TableCell><b>CreatedAt</b></TableCell>
              <TableCell><b>UpdatedAt</b></TableCell>
              <TableCell><b>todos_priority_check</b></TableCell>
              <TableCell><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {data.length > 0 ? (
              data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>{item.priority}</TableCell>
                  <TableCell>{item.isCompleted ? "Yes" : "No"}</TableCell>
                  <TableCell>{item.order_index}</TableCell>
                  <TableCell>{item.createdAt}</TableCell>
                  <TableCell>{item.updatedAt}</TableCell>
                  <TableCell>{item.todos_priority_check}</TableCell>

                  <TableCell>

                    {/* EDIT BUTTON */}
                    <Button
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/update/${item.id}`}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>

                    {/* DELETE BUTTON */}
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>

                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
};

export default Home;
