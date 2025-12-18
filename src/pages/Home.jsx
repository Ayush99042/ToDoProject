// CRUD with Checkbox Completion

import React, { useEffect, useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

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
  Box,
  TextField,
  MenuItem,
  Stack,
} from "@mui/material";

import axios from "axios";

const Home = () => {
  
  const [data, setData] = useState([]);
  const [filterPriority, setFilterPriority] = useState(""); // stores selected priority for filtering

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
  });

  const [editId, setEditId] = useState(null);

  // Fetch todos
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    axios
      .get("http://192.168.1.35:4000/api/todos/")
      .then((res) => setData(res.data))
      .catch((err) => console.error("Error fetching data:", err));
  };

  // Form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add / Update
  const handleSubmit = () => {
    if (!form.title) {
      alert("Title is required");
      return;
    }
    if (!form.description) {
      alert("description is required");
      return;
    }
    if (!form.priority) {
      alert("priority is required");
      return;
    }

    if (editId) {
      axios
        .put(`http://192.168.1.35:4000/api/todos/${editId}`, form)
        .then((res) => {
          setData(data.map((todo) => (todo.id === editId ? res.data : todo)));
          resetForm();
        })
        .catch((err) => console.error("Update error:", err));
    } else {
      axios
        .post("http://192.168.1.35:4000/api/todos/", form)
        .then((res) => {
          setData([...data, res.data]);
          resetForm();
        })
        .catch((err) => console.error("Add error:", err));
    }
  };

  // Edit
  const handleEdit = (todo) => {
    setEditId(todo.id);
    setForm({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    });
  };

  // Delete
  const handleDelete = (id) => {
    if (!window.confirm("Delete this todo?")) return;

    axios
      .delete("http://192.168.1.35:4000/api/todos/" + id)
      .then(() => {
        setData(data.filter((todo) => todo.id !== id));
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // Checkbox toggle
  const handleCheckboxChange = (todo) => {
    axios
      .put(`http://192.168.1.35:4000/api/todos/${todo.id}`, {
        ...todo,
        isCompleted: !todo.isCompleted,
      })
      .then((res) => {
        setData(data.map((item) => (item.id === todo.id ? res.data : item)));
      })
      .catch((err) => console.error("Completion update error:", err));

    fetchTodos();
  };

  const resetForm = () => {
    setForm({ title: "", description: "", priority: "" });
    setEditId(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* ---------- FORM ---------- */}
      <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
        <Paper sx={{ p: 2, width: "50%", minWidth: "400px" }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {editId ? "Edit Todo" : "Add Todo"}
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <TextField
              label="Title"
              name="title"
              size="small"
              required
              sx={{ width: 150 }}
              value={form.title}
              onChange={handleChange}
            />

            <TextField
              label="Description"
              name="description"
              size="small"
              sx={{ width: 250 }}
              value={form.description}
              onChange={handleChange}
            />

            <TextField
              select
              label="Priority"
              name="priority"
              size="small"
              sx={{ width: 120 }}
              value={form.priority}
              onChange={handleChange}
            >
              <MenuItem value="">Select</MenuItem>
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="urgent">Urgent</MenuItem>
            </TextField>

            <Button variant="contained" size="small" onClick={handleSubmit}>
              {editId ? "Update" : "Add"}
            </Button>
          </Stack>
        </Paper>
      </Box>

      {/* ---------- TABLE ---------- */}
      <Box sx={{ display: "flex", justifyContent: "center"}}>
        <TableContainer component={Paper} sx={{ width: "50%"}}>
          <Table >
            <TableHead>
              <TableRow>
                <TableCell colSpan={4}></TableCell>{" "}
                {/* empty cells to push filter right */}
                <TableCell align="right">
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                    alignItems="center"
                  >
                    <Typography>Filter:</Typography>
                    <TextField
                      select
                      size="small"
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      sx={{ width: 120 }}
                    >
                      <MenuItem value="">All</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                      <MenuItem value="normal">Normal</MenuItem>
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="urgent">Urgent</MenuItem>
                    </TextField>
                  </Stack>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {data
                .filter((d) => !filterPriority || d.priority === filterPriority) // filter here
                .map((d, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Checkbox
                        checked={d.isCompleted}
                        onChange={() => handleCheckboxChange(d)}
                      />
                    </TableCell>
                    <TableCell
                      sx={{
                        textDecoration: d.isCompleted ? "line-through" : "none",
                      }}
                    >
                      {d.title}
                    </TableCell>

                    <TableCell
                      sx={{
                        textDecoration: d.isCompleted ? "line-through" : "none",
                      }}
                    >
                      {d.description}
                    </TableCell>

                    <TableCell
                      sx={{
                        textDecoration: d.isCompleted ? "line-through" : "none",
                      }}
                    >
                      {d.priority}
                    </TableCell>

                    <TableCell>
                      <IconButton
                        color="primary"
                        disabled={d.isCompleted}
                        onClick={() => handleEdit(d)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>

                      {d.isCompleted && (
                        <DoneIcon fontSize="small" color="success" />
                      )}

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(d.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Home;
