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
import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { ImageViewer } from '../../components/ImageViewer/ImageViewer';
import AppointmentIcon from '../../components/Icones/AppointmentIcon';
import LocationIcon from '../../components/Icones/LocationIcon';
import { AppointmentInterface } from '../../interfaces/Interfaces';
import { useLocation, useParams } from 'react-router-dom';
import { formatValue } from '../../tools/formatValue';

interface ExpandedAppointmentDetailsProps {
    appointment: AppointmentInterface;
    onClose: () => void;
    onMarkCompleted?: () => void;
}

const ExpandedAppointmentDetails = ({ appointment, onClose, onMarkCompleted }: ExpandedAppointmentDetailsProps) => {
    const [viewerOpen, setViewerOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | undefined>(undefined);
    const location = useLocation();
    const { id } = useParams();
    const [initialValues, setInitialValues] = useState<AppointmentInterface>();

    console.log("initialValues", initialValues);


    console.log("appointment", appointment);

    // Placeholder images array (replace with actual images from appointment)
    const images = [
        ...(appointment?.vehicle?.media?.items?.map((item) => item.sourceUrl) || ['/api/placeholder/400/320']),
        '/api/placeholder/400/320'
    ];

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
        setViewerOpen(true);
    };

    const vehicleName = appointment?.vehicle?.name || 'Unknown Vehicle';
    const vehicleDetail = appointment?.vehicle || { make: 'Unknown', model: 'Model', year: 'Year', trim: '' };
    const serviceTitle = appointment?.service?.title || 'No Service';
    const appointmentDate = appointment?.date ? parseISO(appointment.date) : new Date();
    const appointmentStatus = appointment?.status?.replace('_', ' ') || 'Pending';
    const appointmentNote = appointment?.note || 'No additional notes provided.';
    const appointmentLocationType = appointment?.locationType === 'HOME' ? 'At Home' : appointment?.locationType || 'Unknown Location';


    useEffect(() => {
        if (id && location.state && location.state.appointmentData) {
            // Use the data passed from the previous component
            setInitialValues(location.state.appointmentData);
        }
    }, [id, location.state]);

    if (!appointment) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography variant="h6">No Appointment Details Available</Typography>
                <Button onClick={onClose} sx={{ mt: 2 }}>Close</Button>
            </Box>
        );
    }


    return (
        <Box>
            {/* Header */}
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                p: 2.5,
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
                                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                                }}
                            >
                                {vehicleName.substring(0, 2).toUpperCase()}
                            </Avatar>
                            <Typography>{vehicleName}</Typography>
                        </Box>

                        <Chip
                            label={formatValue(appointmentStatus)}
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
                            {`${vehicleDetail.make} ${vehicleDetail.model}`}
                        </Typography>
                        <Typography sx={{
                            fontSize: '15px',
                            color: '#6F767E'
                        }}>
                            {`${vehicleDetail.year}, ${vehicleDetail.registrationNumber}`}
                        </Typography>
                    </Box>

                    <Box
                        component="img"
                        src={appointment.vehicle?.imageUrl || '/api/placeholder/400/320'}
                        alt={`${vehicleDetail.make} ${vehicleDetail.model}`}
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
                        {serviceTitle}
                    </Typography>

                    <Stack direction="column" spacing={3} sx={{ mb: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <AppointmentIcon fill='' stroke='#6F767E' />
                            <Typography sx={{ fontSize: '15px', color: '#6F767E' }}>
                                {`${format(appointmentDate, 'MMM. dd, yyyy')} • ${format(appointmentDate, 'hh:mm a')}`}
                            </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationIcon fill='' stroke='#6F767E' />
                            <Typography sx={{ fontSize: '15px', color: '#6F767E' }}>
                                {appointmentLocationType}
                            </Typography>
                        </Box>
                    </Stack>

                    <Typography sx={{
                        fontSize: '15px',
                        color: '#6F767E',
                        mb: 3,
                        lineHeight: '24px'
                    }}>
                        {appointmentNote}
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
                                        width: '170px',
                                        height: '100px',
                                        objectFit: 'cover',
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
                                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                                    }}>
                                        {appointment?.vehicle?.name.substring(0, 2).toUpperCase()}
                                    </Avatar>
                                    <Box>
                                        <Typography sx={{ fontSize: '15px', fontWeight: 500, color: '#1A1D1F' }}>
                                            {appointment?.vehicle?.name}
                                        </Typography>
                                        {/* Add email if available in the API */}
                                        <Typography sx={{
                                            fontSize: '13px',
                                            color: '#6F767E'
                                        }}>
                                            {/* Placeholder for email */}
                                            {appointment?.vehicle?.name.toLowerCase().replace(' ', '')}@example.com
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
                                            {appointment.service.title}
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
                                            {/* Placeholder invoice number */}
                                            JC{appointment.id.substring(0, 8).toUpperCase()}
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
                                            {format(parseISO(appointment.date), 'MMM dd, yyyy')}
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
                                            {/* Placeholder amount */}
                                            5,000 Frs
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
                        onClick={onMarkCompleted}
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