import React from "react";
import { useTheme } from "@emotion/react";
import { Box, Container, TextField, MenuItem, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";

export default function ExpenseInfoEditor({ transaction, upload, requireAll }) {
    const theme = useTheme();


    useEffect(() => {
        if (!transaction) {
            return;
        }

        setFormData({
            date: transaction.date || "",
            category: transaction.category || "",
            description: transaction.description || "",
            currency: transaction.currency || "GBP",
            amount: (transaction.amount / 100).toFixed(2) || "",
            location: transaction.location || "GB",
            projectNumber: transaction.project || "",
            receipt: null,
        });
    }, [transaction]);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }

        try {
            formDataToSend.set('date', new Date(formData.date).toISOString().split('T')[0]);
        } catch (error) {
            formDataToSend.set('date', '');
        }

        formDataToSend.set('amount', parseInt(formDataToSend.get('amount')*100));

        try {
            const response = await fetch(`/api/v1/expense/${transaction.id}/update`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Token ${localStorage.getItem('token')}`,
                },
                body: formDataToSend,
            });

            if (!response.ok) {
                console.log('response:', response.text);
                throw new Error('Failed to update expense');
                
            }

            const result = await response.json();
            console.log('Expense updated successfully:', result);
            window.location.href = '/dashboard';
        } catch (error) {
            console.error('Error updating expense:', error);
        }

    };

    return (
        <form onSubmit={handleSubmit} style={{ flex: 1 }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, p: 0, mt: 1, mb: 1 }}>
                <TextField
                    label="Date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    fullWidth
                    margin="dense"
                    slotProps={{ inputLabel: {
                        shrink: true,
                    }}}
                    required={requireAll !== false}
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
                    required={requireAll !== false}
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
                required={requireAll !== false}
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
                required={requireAll !== false}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, p: 0, mt: 2, mb: 1 }}>
                <TextField
                    label="Amount"
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    onBlur={(e) => setFormData({ ...formData, amount: Number(e.target.value).toFixed(2) })}
                    fullWidth
                    required={requireAll !== false}
                    sx={{ m: 0 }}
                />
                <TextField
                    label="Currency"
                    select
                    name="currency"
                    value={formData.currency || "GBP"}
                    onChange={handleChange}
                    fullWidth
                    required={requireAll !== false}
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
                required={requireAll !== false}
            />
            {upload !== "hide" && (
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
                        sx={{ mb: 2, mt: 2 }}
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
            )}
            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                Submit
            </Button>
        </form>
    );
}