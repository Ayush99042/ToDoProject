import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Paper,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";

const Create = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    isCompleted: false,
    order_index: "",
    createdAt: "",
    updatedAt: "",
    todos_priority_check: "",
  });

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle checkbox
  const handleCheckbox = (e) => {
    setForm({ ...form, isCompleted: e.target.checked });
  };

  // Submit form
  const handleSubmit = () => {
    console.log("Form Submitted:", form);
    alert("Todo created! Check console.");
  };

return (
  <Container maxWidth="md" sx={{ mt: 4 }}>
    <Paper sx={{ p: 4 }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Todo</h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <tbody>

          {/* Row 1 */}
          <tr>
            <td style={{ padding: "10px", width: "50%" }}>
              <TextField
                label="Title"
                name="title"
                fullWidth
                required
                value={form.title}
                onChange={handleChange}
              />
            </td>

            <td style={{ padding: "10px", width: "50%" }}>
              <TextField
                label="Order Index"
                name="order_index"
                type="number"
                fullWidth
                value={form.order_index}
                onChange={handleChange}
              />
            </td>
          </tr>

          {/* Row 2 */}
          <tr>
            <td style={{ padding: "10px" }}>
              <TextField
                label="Description"
                name="description"
                multiline
                rows={3}
                fullWidth
                value={form.description}
                onChange={handleChange}
              />
            </td>

            <td style={{ padding: "10px" }}>
              <TextField
                label="Priority Check"
                name="todos_priority_check"
                fullWidth
                value={form.todos_priority_check}
                onChange={handleChange}
              />
            </td>
          </tr>

          {/* Row 3 */}
          <tr>
            <td style={{ padding: "10px" }}>
              <TextField
                select
                label="Priority"
                name="priority"
                fullWidth
                value={form.priority}
                onChange={handleChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </td>

            <td style={{ padding: "10px" }}>
              <FormControlLabel
                control={
                  <Checkbox checked={form.isCompleted} onChange={handleCheckbox} />
                }
                label="Is Completed?"
              />
            </td>
          </tr>

          {/* Row 4 */}
          <tr>
            <td style={{ padding: "10px" }}>
              <TextField
                label="Created At"
                name="createdAt"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.createdAt}
                onChange={handleChange}
              />
            </td>

            <td style={{ padding: "10px" }}>
              <TextField
                label="Updated At"
                name="updatedAt"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={form.updatedAt}
                onChange={handleChange}
              />
            </td>
          </tr>

          {/* Submit Row */}
          <tr>
            <td colSpan="2" style={{ padding: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                haldwidth
                onClick={handleSubmit}
              >
                Create Todo
              </Button>
            </td>
            <td colSpan="2" style={{ padding: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                component={Link}
                to="/"
                // onClick={handleSubmit}
              >
                Back
              </Button>
            </td>
          </tr>

        </tbody>
      </table>
    </Paper>
  </Container>
);


};

export default Create;
