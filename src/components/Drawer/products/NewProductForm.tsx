import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AddIcon from '@mui/icons-material/Add';
import { AddProduct } from '../../../interfaces/Interfaces';
import { JC_Services } from '../../../services';
import { useSelector } from 'react-redux';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { Alert, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';

interface NewProductFormProps {
    onSubmit: (data: any) => void;
}

const NewProductForm = ({ onSubmit }: NewProductFormProps) => {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    // const [formData, setFormData] = useState({
    //     name: '',
    //     description: '',
    //     category: '',
    //     price: '',
    //     discountPrice: ''
    // });
    const [productformData, setProductFormData] = useState<AddProduct>({
        active: true,
        description: '',
        name: '',
        category: '',
        price: {
            amount: 0,
            currency: 'XAF',
        },
        stockQuantity: 0,
        id: '',
        createdBy: '',
        updatedBy: '',
        createdAt: '',
        updatedAt: '',
    });

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    console.log("submit", onSubmit);

    // console.log("userconnected", connectedUsers);
    const token = connectedUsers.accessToken

    // State for handling image files instead of base64 strings
    const [featuredImageFile, setFeaturedImageFile] = useState<File | null>(null);
    const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);

    // Preview states
    const [featuredImage, setFeaturedImage] = useState<string | null>(null);
    const [additionalImages, setAdditionalImages] = useState<string[]>([]);

    // console.log("featuredImage", featuredImage);
    // console.log("additionalImages", additionalImages);
    console.log("featuredImageFile", featuredImageFile);
    console.log("additionalImageFiles", additionalImageFiles);


    const handleAddProduct = async () => {
        setLoading(true);

        // Validate required fields
        if (!productformData.name || !productformData.description || !productformData.category || !productformData.price.amount) {
            setErrorMessage('Please fill in all required fields');
            setLoading(false);
            return;
        }

        // Validate images
        if (!featuredImageFile) {
            setErrorMessage('Please add a featured image');
            setLoading(false);
            return;
        }

        try {
            // Create product first
            const response = await JC_Services('JAPPCARE', `product`, 'POST', productformData, token);

            if (response && (response.status === 200 || response.status === 201)) {
                console.log("addresponse", response);

                const productId = response.body.id; // Assuming the response includes the created product ID

                // Upload images
                await uploadProductMedia(productId, featuredImageFile, additionalImageFiles);

                setSuccessMessage('Product created successfully with images!');

                // Reset form
                setProductFormData({
                    active: true,
                    description: '',
                    name: '',
                    category: '',
                    price: {
                        amount: 0,
                        currency: 'XAF',
                    },
                    stockQuantity: 0,
                    id: '',
                    createdBy: '',
                    updatedBy: '',
                    createdAt: '',
                    updatedAt: '',
                });
                setFeaturedImage(null);
                setFeaturedImageFile(null);
                setAdditionalImages([]);
                setAdditionalImageFiles([]);
            } else if (response && response.status === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Failed to create product');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error. Try Again Later!");
        }

        setLoading(false);
    };

    // const uploadProductMedia = async (productId: string, mainImage: File, additionalImages: File[]) => {
    //     try {
    //         // Create FormData for the main image
    //         const mainImageFormData = new FormData();
    //         mainImageFormData.append('files', mainImage);

    //         // Upload main image
    //         await JC_Services('JAPPCARE', `product/${productId}/upload-media`, 'POST', mainImageFormData, token);

    //         // Upload additional images if any
    //         if (additionalImages.length > 0) {
    //             const additionalImagesFormData = new FormData();
    //             additionalImages.forEach(file => {
    //                 additionalImagesFormData.append('files', file);
    //             });

    //             await JC_Services('JAPPCARE', `product/${productId}/upload-media`, 'POST', additionalImagesFormData, token);
    //         }
    //     } catch (error) {
    //         console.error("Error uploading media:", error);
    //         throw error;
    //     }
    // };

    const uploadProductMedia = async (productId: string, mainImage: File, additionalImages: File[]) => {
        try {
            // Convert the files to an array of strings (you may need to adjust this part
            // depending on how exactly your API expects to receive the files)
            const allFiles = [mainImage, ...additionalImages];

            // Create URLSearchParams to send files as query parameters
            const params = new URLSearchParams();
            allFiles.forEach(file => {
                params.append('files', file.name); // or however you need to represent the file
            });

            // Make the API call with query parameters
            const url = `product/${productId}/upload-media?${params.toString()}`;
            await JC_Services('JAPPCARE', url, 'POST', null, token);

        } catch (error) {
            console.error("Error uploading media:", error);
            throw error;
        }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Handle nested price object
        if (name === 'amount' || name === 'currency') {
            setProductFormData(prev => ({
                ...prev,
                price: {
                    ...prev.price,
                    [name]: name === 'amount' ? Number(value) : value
                }
            }));
        } else {
            // Handle other fields
            setProductFormData(prev => ({
                ...prev,
                [name]: name === 'stockQuantity' ? Number(value) : value
            }));
        }
    };

    const handleFeaturedImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFeaturedImageFile(file);

            // Create preview
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
            setAdditionalImageFiles(prev => [...prev, file]);

            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setAdditionalImages(prev => [...prev, reader.result as string]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCloseSuccess = () => {
        setSuccessMessage('');
    };

    const handleCloseError = () => {
        setErrorMessage('');
    };
    return (
        <Box >

            {successMessage && (
                <Alert
                    severity="success"
                    sx={{ mb: 2 }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseSuccess}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {successMessage}
                </Alert>
            )}

            {errorMessage && (
                <Alert
                    severity="error"
                    sx={{ mb: 2 }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={handleCloseError}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {errorMessage}
                </Alert>
            )}
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
                    value={productformData.name}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Name"
                    required
                />

                <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={productformData.description}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Description"
                    required
                />

                <TextField
                    select
                    fullWidth
                    label="Category"
                    required
                    name="category"
                    value={productformData.category}
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
                    <MenuItem value="" disabled selected>Select Category</MenuItem>
                    <MenuItem value="BODY_KIT">BODY KIT</MenuItem>
                    <MenuItem value="ENGINE">ENGINE</MenuItem>
                    <MenuItem value="TIRE">TIRE</MenuItem>
                    <MenuItem value="SUSPENSION">SUSPENSION</MenuItem>
                    <MenuItem value="INTERIOR">INTERIOR</MenuItem>
                    <MenuItem value="ACCESSORIES">ACCESSORIES</MenuItem>
                    <MenuItem value="OTHER">OTHER </MenuItem>
                </TextField>

                <TextField
                    fullWidth
                    label="Stock Quantity"
                    name="stockQuantity"
                    value={productformData.stockQuantity}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ mb: 2 }}
                    placeholder="Stock Quantity"
                    required
                />

                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: 2, mb: 2 }}>
                    <TextField
                        sx={{ width: 120 }}
                        label="XAF"
                        name="currency"
                        placeholder="XAF"
                        value={productformData.price.currency}
                        onChange={handleChange}
                        variant="outlined"
                        required
                    />

                    <TextField
                        fullWidth
                        label="Price"
                        name="amount"
                        value={productformData.price.amount}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="Price"
                        required
                    />
                </Box>

                {/* <TextField
                fullWidth
                label="Discount Price"
                name="discountPrice"
                value={formData.discountPrice}
                onChange={handleChange}
                variant="outlined"
                sx={{ mb: 2 }}
                placeholder="Discount Price"
            /> */}
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
            <Box
            // sx={{
            //     position: 'absolute',
            //     bottom: 0,
            //     left: 0,
            //     right: 0,
            //     zIndex: 1,
            //     p: 2
            // }}
            >
                <Button
                    fullWidth
                    variant="contained"
                    // onClick={() => onSubmit(productformData)}
                    onClick={handleAddProduct}
                    sx={{
                        bgcolor: '#000',
                        color: 'white',
                        py: 1.5,
                        '&:hover': {
                            bgcolor: '#333'
                        }
                    }}
                >
                    {loading ? <CircularProgress /> : "Create product"}
                </Button>
            </Box>

        </Box>
    );
};

export default NewProductForm;