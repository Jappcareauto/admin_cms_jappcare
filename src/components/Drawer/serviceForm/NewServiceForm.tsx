import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface NewServiceFormProps {
    onSubmit: (data: any) => void;
    onCancel: () => void;
}

const NewServiceForm = ({ onSubmit, onCancel }: NewServiceFormProps) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        definition: 'CUSTOM',
        serviceCenter: ''
    });
    console.log("close", onCancel);


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
        <Box component="form" onSubmit={handleSubmit}>
            <Stack spacing={3} sx={{ mb: 21 }}>
                <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={formData.title}
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

                <TextField
                    select
                    fullWidth
                    label="Definition"
                    name="definition"
                    value={formData.definition}
                    onChange={handleChange}
                    required
                    SelectProps={{
                        MenuProps: {
                            PaperProps: {
                                sx: {
                                    bgcolor: 'white',
                                    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)'
                                }
                            }
                        }
                    }}
                // sx={{
                //     '& .MuiSelect-select': {
                //         // bgcolor: 'white'
                //     },
                //     '& .MuiMenu-paper': {
                //         // bgcolor: 'white'
                //     }
                // }}
                >
                    <MenuItem value="CUSTOM" sx={{ bgcolor: 'white' }}>Custom</MenuItem>
                    <MenuItem value="STANDARD" sx={{ bgcolor: 'white' }}>Standard</MenuItem>
                    <MenuItem value="PREMIUM" sx={{ bgcolor: 'white' }}>Premium</MenuItem>
                </TextField>

                <TextField
                    fullWidth
                    label="Service Center"
                    name="serviceCenter"
                    value={formData.serviceCenter}
                    onChange={handleChange}
                    required
                />


            </Stack>
            {/* Button Section */}
            <Box sx={{
                mt: 'auto',
                pt: 3,
                // borderTop: '1px solid',
                // borderColor: 'divider'
            }}>
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
                    Create service
                </Button>
            </Box>
        </Box>
    );
};

export default NewServiceForm;