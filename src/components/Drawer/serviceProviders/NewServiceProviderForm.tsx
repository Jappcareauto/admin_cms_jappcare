import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ImageIcon from '../../Icones/ImageIcon';
import { Grid } from '@mui/material';
import Images from '../../../assets/Images/Images';

interface NewServiceProviderFormProps {
    onSubmit: (data: any) => void;
}


const NewServiceProviderForm = ({ onSubmit }: NewServiceProviderFormProps) => {
    const [formData, setFormData] = useState({
        companyName: '',
        name: '',
        email: '',
        password: '',
        homeAddress: '',
        phoneNumber: '',
        percentageCommission: '',
        countryCode: '+237'
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




    const services = [
        {
            name: 'General\nMaintenance',
            icon: Images.maintainanceicon,
        },
        {
            name: 'Body Shop',
            icon: Images.bodyshopicon,
        },
        {
            name: 'Deep\nCleaning',
            icon: Images.deepcleaningicon,
        },
    ];


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}

        >
            {/* User Details Header */}

            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {/* Avatar Section with Edit Icon */}
                <Box sx={{ position: 'relative', width: 'fit-content', mb: 4, display: "flex", alignItems: "center", }}>
                    <Avatar
                        sx={{
                            width: 128,
                            height: 128,
                            bgcolor: 'black',
                            border: '4px solid #FB7C37',
                            boxShadow: 'inset 0 0 0 4px rgb(255, 255, 255)',
                        }}
                    >
                        <Typography sx={{ color: '#FB7C37', fontSize: '24px', fontWeight: 600 }}>
                            SM
                        </Typography>
                    </Avatar>
                    <Box
                        sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 5,
                            bgcolor: '#FB7C37',
                            borderRadius: '50%',
                            width: 36,
                            height: 36,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <EditIcon sx={{ color: 'white', fontSize: 16 }} />
                    </Box>
                </Box>
            </Box>


            <Stack spacing={2.5}>
                {/* <TextField
                    fullWidth
                    label="Company Names"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '8px',
                            backgroundColor: 'white',
                            height: '40px',
                            '& input': {
                                padding: '0 14px',
                                height: '100%',
                            },
                            '& fieldset': {
                                borderColor: 'rgb(254, 226, 226)',
                            },
                            '&:hover fieldset': {
                                borderColor: 'rgb(254, 226, 226)',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: 'rgb(254, 226, 226)',
                            }
                        },
                        '& .MuiInputLabel-outlined': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                        },
                        '& .MuiInputLabel-outlined.MuiInputLabel-shrink': {
                            transform: 'translate(14px, -9px) scale(0.75)',
                        }
                    }}
                /> */}

                <TextField
                    fullWidth
                    label="Company Name"
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    variant="outlined"
                />
                {/* Name Field */}
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    variant="outlined"
                />


                {/* Email Field */}
                <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    variant="outlined"
                />
                {/* Email Field */}
                <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    variant="outlined"
                />

                {/* Home Address Field */}
                <TextField
                    fullWidth
                    label="Home Address"
                    name="homeAddress"
                    placeholder="Home Address"
                    value={formData.homeAddress}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setFormData(prev => ({ ...prev, homeAddress: '' }))}
                                    edge="end"
                                >
                                    <ImageIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                {/* Phone Number Field */}
                <Box sx={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                    <TextField
                        sx={{ width: 120 }}
                        label="Country Code"
                        name="countryCode"
                        placeholder="+237"
                        type="phoneNumber"
                        value={formData.countryCode}
                        onChange={handleChange}
                        variant="outlined"
                    />

                    <TextField
                        fullWidth
                        // sx={{ pl: 1 }}
                        label="Phone Number"
                        name="phoneNumber"
                        placeholder="Hint text"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        variant="outlined"

                    />

                </Box>
                <TextField
                    fullWidth
                    label="Percentage Commission"
                    name="percentageCommission"
                    placeholder="[ercentage Commission"
                    value={formData.percentageCommission}
                    onChange={handleChange}
                    variant="outlined"

                />

                {/* Services Section */}
                <Typography sx={{ fontSize: '16px', fontWeight: 500, mb: 1.5 }}>
                    Services
                </Typography>
                <Grid container spacing={1} sx={{ mb: 3 }}>
                    {services.map((service, index) => (
                        <Grid item xs={4} key={index}>
                            <Box
                                sx={{
                                    bgcolor: '#FFEDE6',
                                    borderRadius: 1,
                                    p: 2,
                                    height: '100%',
                                    width: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '12px',
                                        textAlign: 'center',
                                        whiteSpace: 'pre-line',
                                        lineHeight: 1.2,
                                        mb: 2
                                    }}
                                >
                                    {service.name}
                                </Typography>
                                <Box
                                    sx={{
                                        width: 132,
                                        height: 57,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <img
                                        src={service.icon}
                                        alt={service.name}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'contain'
                                        }}
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    ))}
                </Grid>



                {/* Submit Button */}
                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        py: 1.5,
                        textTransform: 'none',
                        borderRadius: 1,
                        mt: 1,
                        '&:hover': {
                            bgcolor: '#333'
                        }
                    }}
                >
                    Create Service Provider
                </Button>
            </Stack>
        </Box>
    );
};

export default NewServiceProviderForm
