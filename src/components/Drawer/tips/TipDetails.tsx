import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';

interface TipDetailsFormProps {
    onSubmit: (data: any) => void;
}

const TipDetails = ({ onSubmit }: TipDetailsFormProps) => {
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
            <Box>
                <Typography variant='body1' color='#FB7C37'>
                    Tip
                </Typography>
                <Typography>
                    Inspect tire treads for wear
                </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
                <Typography variant='body1' color='#FB7C37'>
                    Description
                </Typography>
                <Typography>
                    When inspecting tire treads for wear, make sure to check for any signs of uneven wear patterns, such as cupping or feathering. Look for tread depth indicators to ensure they are not worn down beyond safe levels. Additionally, examine the overall condition of the tires for any cracks, bulges, or foreign objects embedded in the tread. Regularly inspecting your tire treads can help ensure optimal performance and safety on the road.                </Typography>
            </Box>

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
                    Edit Tip
                </Button>
            </Box>
        </Box>
    );
};

export default TipDetails;