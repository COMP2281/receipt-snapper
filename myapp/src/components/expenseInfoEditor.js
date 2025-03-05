import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Container, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function ExpenseInfoEditor({expenseID}) {
    const theme = useTheme();

    useEffect(() => {
        if (!expenseID) {
            return;
        }

        // GET EXPENSE INFO FROM API HERE
        
    }, [expenseID]);

    const [formData, setFormData] = useState({
        date: "",
        category: "",
        description: "",
        currency: "GBP",
        amount: "",
        location: "GB",
        projectNumber: "",
        receipt: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            receipt: e.target.files[0],
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log(formData);
    };


    return (
        <form onSubmit={{handleSubmit}} style={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, p: 0, mt: 1, mb: 1 }}>
                <TextField
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                    sx={{ m: 0, p: 0, width: '50%' }}   
                />
                <TextField
                    label="Expense Location"
                    select
                    name="location"
                    value={formData.location || "GB"}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    required
                    sx={{ m: 0, p: 0, width: '50%' }}
                >
                    <MenuItem value="GB">GB</MenuItem>
                    <MenuItem value="AU">AU</MenuItem>
                </TextField>
            </Box>
            <TextField
                label="Category"
                select
                name="category"
                value={formData.category}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            >
                <MenuItem value="travel">Travel</MenuItem>
                <MenuItem value="food">Food</MenuItem>
                <MenuItem value="accommodation">Accommodation</MenuItem>
                <MenuItem value="other">Other</MenuItem>
            </TextField>
            <TextField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, p: 0, mt: 2, mb: 1 }}>
                <TextField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ m: 0 }}
                />
                <TextField
                    label="Currency"
                    select
                    name="currency"
                    value={formData.currency || "GBP"}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ m: 0 }}
                >
                    <MenuItem value="GBP">GBP</MenuItem>
                    <MenuItem value="AUD">AUD</MenuItem>
                </TextField>
            </Box>
            <TextField
                label="Project Number"
                name="projectNumber"
                value={formData.projectNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />
            <Container 
                sx={{
                    borderRadius: '5px',
                    pb: .8,
                    pt: 1,
                    mt: 1.5,
                    textAlign: 'center',
                    marginBottom: '20px',
                    background: theme.palette.gradient.secondary,
                    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.47)', // Added drop shadow
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    setFormData({
                        ...formData,
                        receipt: file,
                    });
                }}
            >
                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    color="secondary"
                    sx={{ mb: 2, mt: 2}}
                >
                    Upload Receipt (Optional)
                    <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                    />
                </Button>
                <Typography variant="body2" sx={{ mb: 2, textAlign: 'center' }}>
                    {formData.receipt ? `Selected file: ${formData.receipt.name}` : "No file chosen"}
                </Typography>   
            </Container>
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx = {{ mt: 1 }}
            >
                Submit
            </Button>
        </form>

    );
}