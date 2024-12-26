import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';

interface NewProductFormProps {
    onSubmit: (data: any) => void;
}

const NewProductForm = ({ onSubmit }: NewProductFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: '',
        price: '',
        discountPrice: ''
    });

    const [featuredImage, setFeaturedImage] = useState<string | null>(null);
    const [additionalImages, setAdditionalImages] = useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFeaturedImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFeaturedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAdditionalImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdditionalImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Box >


            {/* Featured Image Upload */}
            <Box
                sx={{
                    width: '100%',
                    height: '200px',
                    bgcolor: 'rgba(255, 107, 0, 0.1)',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden'
                }}
                component="label"
            >
                {featuredImage ? (
                    <Box
                        component="img"
                        src={featuredImage}
                        alt="Featured product"
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                        }}
                    />
                ) : (
                    <>
                        <AddIcon sx={{ color: '#FF6B00', mb: 1 }} />
                        <Typography sx={{ color: '#FF6B00' }}>
                            Add Featured Image
                        </Typography>
                    </>
                )}
                <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFeaturedImageUpload}
                />
            </Box>

            {/* Form Fields */}
            <Box sx={{ mb: 3 }}>
                <TextField
                    fullWidth
                    label="Product Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Name"
                />

                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Description"
                />

                <TextField
                    select
                    fullWidth
                    label="Category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    variant="outlined"
                    placeholder="e.g Body Kit"
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
                    sx={{
                        mb: 2,

                        '& .MuiSelect-select': {
                            bgcolor: 'white'
                        },
                        '& .MuiMenu-paper': {
                            bgcolor: 'white'
                        }
                    }}
                >
                    <MenuItem value="bodyKit">Body Kit</MenuItem>
                    <MenuItem value="lights">Lights</MenuItem>
                    <MenuItem value="wheels">Wheels</MenuItem>
                </TextField>

                <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Price"
                />

                <TextField
                    fullWidth
                    label="Discount Price"
                    name="discountPrice"
                    value={formData.discountPrice}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Discount Price"
                />
            </Box>

            {/* Additional Images */}
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
                Add Images
            </Typography>
            <Box sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                mb: 3
            }}>
                {additionalImages.map((img, index) => (
                    <Box
                        key={index}
                        component="img"
                        src={img}
                        alt={`Product view ${index + 1}`}
                        sx={{
                            width: '100%',
                            height: '100px',
                            objectFit: 'cover',
                            borderRadius: 1
                        }}
                    />
                ))}
                <Box
                    sx={{
                        width: '100%',
                        height: '100px',
                        bgcolor: 'rgba(255, 107, 0, 0.1)',
                        borderRadius: 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                    }}
                    component="label"
                >
                    <AddIcon sx={{ color: '#FF6B00' }} />
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleAdditionalImageUpload}
                    />
                </Box>
            </Box>

            {/* Submit Button */}
            <Button
                fullWidth
                variant="contained"
                onClick={() => onSubmit(formData)}
                sx={{
                    bgcolor: '#000',
                    color: 'white',
                    py: 1.5,
                    '&:hover': {
                        bgcolor: '#333'
                    }
                }}
            >
                Create product
            </Button>
        </Box>
    );
};

export default NewProductForm;