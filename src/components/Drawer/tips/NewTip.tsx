import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface NewTipFormProps {
    onSubmit: (data: any) => void;
}

const NewTip = ({ onSubmit }: NewTipFormProps) => {
    const [formData, setFormData] = useState({
        tip: '',
        description: '',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden' // Prevent scrolling of the entire drawer
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    flex: 1,
                    overflow: 'auto', // Allow scrolling of the form content
                    p: 0,
                    pb: 9,// Add padding to prevent content from being hidden behind button
                    pt: 3
                }}
            >
                <Stack spacing={3}>
                    <TextField
                        fullWidth
                        label="Tip Summary"
                        placeholder='e.g Always rotate your car tires regularly'
                        name="tip"
                        value={formData.tip}
                        onChange={handleChange}
                        required
                    />

                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        required
                    />
                </Stack>
            </Box>

            {/* Button Section */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1
                }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                        color: 'white',
                        bgcolor: '#000',
                        py: 1.5,
                        '&:hover': { bgcolor: '#333', borderColor: '#333' }
                    }}
                >
                    Save Tip
                </Button>
            </Box>
        </Box>
    );
};

export default NewTip;