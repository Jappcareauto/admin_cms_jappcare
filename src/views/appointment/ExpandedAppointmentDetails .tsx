import {
    Box,
    Typography,
    Avatar,
    Chip,
    Grid,
    TextField,
    Button,
    Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Images from '../../assets/Images/Images';
import AppointmentIcon from '../../components/Icones/AppointmentIcon';
import LocationIcon from '../../components/Icones/LocationIcon';
import { useState } from 'react';
import { ImageViewer } from '../../components/ImageViewer/ImageViewer';

interface ExpandedAppointmentDetailsProps {
    onClose: () => void;
}

const ExpandedAppointmentDetails = ({ onClose }: ExpandedAppointmentDetailsProps) => {
    const [viewerOpen, setViewerOpen] = useState(false);

    const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined);
    const images = [Images.car1, Images.car1, Images.car2, Images.car2, Images.Porsche, Images.test];

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setViewerOpen(true);
    };
    return (
        <Box >
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
                // borderBottom: '1px solid',
                borderColor: 'grey.200'
            }}>
                <Typography
                    variant="h6"
                    sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#1A1D1F'
                    }}
                >
                    Appointment Details
                </Typography>
                <CloseIcon
                    onClick={onClose}
                    sx={{
                        cursor: 'pointer',
                        color: '#1A1D1F'
                    }}
                />
            </Box>

            {/* Main Content */}
            <Grid container>
                {/* Left Column */}
                <Grid item xs={12} md={8} sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, justifyContent: 'space-between' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: '#1A1D1F',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#FF7A00',
                                    border: '2px solid #FF7A00',
                                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

                                }}
                            >
                                JM
                            </Avatar>
                            <Typography>James Mann</Typography>
                        </Box>

                        <Chip
                            label="In Progress"
                            size="small"
                            sx={{
                                height: '24px',
                                bgcolor: 'transparent',
                                color: '#FF6B00',
                                border: '1px solid #FF6B00',
                                borderRadius: '12px',
                                '& .MuiChip-label': {
                                    px: 1.5,
                                    fontSize: '13px',
                                    fontWeight: 500
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography sx={{
                            fontSize: '24px',
                            fontWeight: 600,
                            color: '#1A1D1F',
                            mb: 1
                        }}>
                            Porsche Taycan Turbo S
                        </Typography>
                        <Typography sx={{
                            fontSize: '15px',
                            color: '#6F767E'
                        }}>
                            2024, RWD
                        </Typography>
                    </Box>

                    <Box
                        component="img"
                        src={Images.Porsche}
                        alt="Porsche Taycan"
                        sx={{
                            width: '100%',
                            maxWidth: '400px',
                            height: 'auto',
                            borderRadius: '12px',
                            mb: 3
                        }}
                    />

                    <Typography sx={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#FF6B00',
                        mb: 2
                    }}>
                        Body shop appointment
                    </Typography>

                    <Stack direction="column" spacing={3} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AppointmentIcon fill='' stroke='#6F767E' />
                            <Typography sx={{ fontSize: '15px', color: '#6F767E' }}>
                                Oct. 20, 2024 • 10am
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationIcon fill='' stroke='#6F767E' />
                            <Typography sx={{ fontSize: '15px', color: '#6F767E' }}>
                                At Home
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography sx={{
                        fontSize: '15px',
                        color: '#6F767E',
                        mb: 3,
                        lineHeight: '24px'
                    }}>
                        There is a noticeable dent on the rear bumper of my Porsche Taycan, specifically located between the lower edge of the rear headlight and the rear wheel arch. It is closer to the wheel arch, situated near the car's side profile. The dent is below the horizontal line of the rear headlight and sits closer to the lower third of the rear bumper.
                    </Typography>

                    <Typography sx={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#1A1D1F',
                        mb: 2
                    }}>
                        Images
                    </Typography>

                    <Grid container spacing={2}>
                        {images.map((img, index) => (
                            <Grid item xs={4} md={3} key={index}>
                                <Box
                                    component="img"
                                    src={img}
                                    alt={`Damage view ${index + 1}`}
                                    onClick={() => handleImageClick(index)}
                                    sx={{
                                        width: '170px', // Fixed width
                                        height: '100px', // Fixed height
                                        objectFit: 'cover', // Ensures the image fills the box without distortion
                                        borderRadius: '12px',
                                        cursor: 'pointer',
                                    }}
                                />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Image Viewer Modal */}
                    <ImageViewer
                        open={viewerOpen}
                        onClose={() => setViewerOpen(false)}
                        images={images}
                        initialIndex={selectedImageIndex}
                    />
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={4} sx={{
                    borderLeft: '1px solid #E6E8EC',
                    // bgcolor: '#FCFCFC',
                    p: 3
                }}>
                    <Typography sx={{
                        fontSize: '20px',
                        fontWeight: 600,
                        color: '#1A1D1F',
                        mb: 3
                    }}>
                        Appointment Results
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography sx={{
                            fontSize: '15px',
                            color: '#1A1D1F',
                            mb: 1.5
                        }}>
                            Diagnosis & Repairs to be made
                        </Typography>
                        <TextField
                            multiline
                            rows={5}
                            fullWidth
                            placeholder="Summarize what was the issue on the vehicle and the repairs to be made"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#fff',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: '#E6E8EC'
                                    }
                                }
                            }}
                        />

                        <Typography sx={{
                            fontSize: '15px',
                            color: '#1A1D1F',
                            mb: 1.5
                        }}>
                            Repairs made
                        </Typography>
                        <TextField
                            multiline
                            rows={5}
                            fullWidth
                            placeholder="Summarize what was done on the vehicle"
                            sx={{
                                mb: 3,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: '#fff',
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderColor: '#E6E8EC'
                                    }
                                }
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 3
                        }}>
                            <Typography sx={{ fontSize: '15px', color: '#1A1D1F' }}>
                                Invoice
                            </Typography>

                        </Box>

                        <Box sx={{ mb: 3, border: '1px solid #E6E8EC', borderRadius: '12px', p: 3, }}>
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1.5,
                                mb: 3,
                                justifyContent: 'space-between',
                            }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                    <Avatar sx={{
                                        width: 50,
                                        height: 50,
                                        bgcolor: '#1A1D1F',
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: '#FF7A00',
                                        border: '2px solid #FF7A00',
                                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

                                    }}>
                                        SM
                                    </Avatar>
                                    <Box>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: '#1A1D1F' }}>
                                            Sara Maye
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '13px',
                                            color: '#6F767E'
                                        }}>
                                            sarahmaye@gmail.com
                                        </Typography>
                                    </Box>
                                </Box>
                                <Chip
                                    label="Pending"
                                    size="small"
                                    sx={{
                                        height: '34px',
                                        bgcolor: '#FFEDE9',
                                        padding: '12px 10px',
                                        color: '#F1351B',
                                        // border: '1px solid #FF6B00',
                                        borderRadius: '16px',
                                        '& .MuiChip-label': {
                                            px: 1.5,
                                            fontSize: '15px',
                                            fontWeight: 600
                                        }
                                    }}
                                />
                            </Box>

                            <Grid container spacing={2} sx={{ mb: 3 }}>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'space-between' }}>

                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#6F767E',
                                            mb: 0.5
                                        }}>
                                            Service
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#1A1D1F',
                                            fontWeight: 600
                                        }}>
                                            Inspection Fee
                                        </Typography>
                                    </Box>

                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'space-between' }}>

                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#6F767E',
                                            mb: 0.5
                                        }}>
                                            Invoice Number
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#1A1D1F',
                                            fontWeight: 600
                                        }}>
                                            JC84727F300
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'space-between' }}>

                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#6F767E',
                                            mb: 0.5
                                        }}>
                                            Date Issued
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#1A1D1F',
                                            fontWeight: 600
                                        }}>
                                            Oct 20, 2024
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item xs={12}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, justifyContent: 'space-between' }}>

                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#6F767E',
                                            mb: 0.5
                                        }}>
                                            Amount
                                        </Typography>
                                        <Typography sx={{
                                            fontSize: '15px',
                                            color: '#FF6B00',
                                            fontWeight: 600
                                        }}>
                                            7,000 Frs
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>

                            <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="outlined"
                                    sx={{
                                        height: '40px',
                                        borderRadius: '28px',
                                        borderColor: '#111111',
                                        color: '#1A1D1F',
                                        textTransform: 'none',
                                        '&:hover': {
                                            borderColor: '#888888',
                                            bgcolor: 'rgba(230, 232, 236, 0.1)'
                                        }
                                    }}
                                >
                                    View Invoice
                                </Button>
                            </Stack>
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: "center", justifyContent: 'space-between' }}>
                            <Typography sx={{
                                fontSize: '15px',
                                color: '#1A1D1F',
                                mb: 0.5
                            }}>
                                Invoice
                            </Typography>
                            <Button
                                variant="outlined"
                                sx={{
                                    height: '40px',
                                    borderRadius: '28px',
                                    borderColor: '#111111',
                                    color: '#1A1D1F',
                                    textTransform: 'none',
                                    '&:hover': {
                                        borderColor: '#888888',
                                        bgcolor: 'rgba(230, 232, 236, 0.1)'
                                    }
                                }}
                            >
                                Create Invoice
                            </Button>
                        </Box>

                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            height: '48px',
                            bgcolor: '#1A1D1F',
                            color: 'white',
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontSize: '15px',
                            fontWeight: 600,
                            '&:hover': {
                                bgcolor: '#000'
                            }
                        }}
                    >
                        Mark as completed
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ExpandedAppointmentDetails;