import {
    Box,
    Typography,
    Avatar,
    Chip,
    Grid,
    TextField,
    Button,
    Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Images from '../../assets/Images/Images';

interface ExpandedAppointmentDetailsProps {
    onClose: () => void;
}

const ExpandedAppointmentDetails = ({ onClose }: ExpandedAppointmentDetailsProps) => {
    return (
        <Box >
            {/* Header */}
            <Box sx={{
                p: 3,
                // borderBottom: '1px solid',
                borderColor: 'grey.200',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
            }}>
                <Typography variant="h6" sx={{ mb: 3 }}>Appointment Details</Typography>
                <Button
                    startIcon={<CloseIcon />}
                    onClick={onClose}
                    sx={{ color: 'text.primary' }}
                >
                    Close
                </Button>
            </Box>

            {/* Main Content */}
            <Grid container sx={{ p: 3 }} spacing={4}>
                {/* Left Column */}
                <Grid item xs={12} md={8}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#1A1D1F',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: '#FF7A00',
                            border: '2px solid #FF7A00',
                        }}>
                            JM
                        </Avatar>
                        <Typography variant="h6">James Mann</Typography>
                        <Chip
                            label="In Progress"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(255, 107, 0, 0.1)',
                                color: '#FF6B00',
                            }}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" sx={{ color: '#FF6B00', fontWeight: 600, mb: 1 }}>
                            Porsche Taycan Turbo S
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            2024, RWD
                        </Typography>
                    </Box>

                    <Box
                        component="img"
                        src={Images.Porsche}// Replace with actual image path
                        alt="Porsche Taycan"
                        sx={{
                            width: '50%',
                            height: 'auto',
                            borderRadius: 2,
                            mb: 2
                        }}
                    />

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" sx={{ color: '#FF6B00', mb: 2 }}>
                            Body shop appointment
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">Oct. 20, 2024</Typography>
                                <Typography variant="body2">10am</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Typography variant="body2">At Home</Typography>
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            There is a noticeable dent on the rear bumper of my Porsche Taycan, specifically located between the lower edge of the rear headlight and the rear wheel arch. It is closer to the wheel arch, situated near the car's side profile. The dent is below the horizontal line of the rear headlight and sits closer to the lower third of the rear bumper.
                        </Typography>
                    </Box>

                    <Box sx={{ mb: 4, mr: 3 }}>
                        <Typography variant="h6" sx={{ mb: 2 }}>Images</Typography>
                        <Grid container spacing={2}>
                            {[Images.car1, Images.car1, Images.car2,].map((img) => (
                                <Grid item xs={4} md={2} key={img}>
                                    <Box
                                        component="img"
                                        src={img}
                                        alt={`Damage view ${img}`}
                                        sx={{
                                            width: '100%',
                                            height: 'auto',
                                            borderRadius: 1
                                        }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Box>
                </Grid>

                {/* <Divider orientation="vertical" flexItem sx={{ mx: 3 }} /> */}
                {/* Right Column */}
                <Grid item xs={12} md={4} sx={{ borderLeft: '1px solid', borderColor: 'grey.400' }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>Appointment Results</Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography variant="body1" sx={{ mb: 2 }}>Diagnosis & Repairs to be made</Typography>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Summarize what we found on the vehicle and the repairs to be made"
                            sx={{ mb: 3 }}
                        />

                        <Typography variant="body1" sx={{ mb: 2 }}>Repairs made</Typography>
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            placeholder="Summarize what was done on the vehicle"
                            sx={{ mb: 3 }}
                        />
                    </Box>

                    <Box sx={{ mb: 4 }}>
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 2
                        }}>
                            <Typography variant="body1">Invoice</Typography>
                            <Chip
                                label="Pending"
                                size="small"
                                sx={{ color: '#FF6B00' }}
                            />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Box sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        mb: 2
                                    }}>
                                        <Avatar sx={{
                                            width: 40,
                                            height: 40,
                                            bgcolor: '#1A1D1F',
                                            fontSize: '14px',
                                            color: '#FF7A00',
                                            border: '2px solid #FF7A00',
                                        }}>
                                            SM
                                        </Avatar>
                                        <Box>
                                            <Typography variant="body1">Sara Maye</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                saramaye@gmail.com
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Service</Typography>
                                    <Typography variant="body1">Inspection Fee</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Invoice Number</Typography>
                                    <Typography variant="body1">JC84727F300</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Date Issued</Typography>
                                    <Typography variant="body1">Oct 20, 2024</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography variant="body2" color="text.secondary">Amount</Typography>
                                    <Typography variant="body1" sx={{ color: '#FF6B00' }}>7,000 Frs</Typography>
                                </Grid>
                            </Grid>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    flex: 1,
                                    borderColor: 'grey.300'
                                }}
                            >
                                View Invoice
                            </Button>
                            <Button
                                variant="outlined"
                                sx={{
                                    borderRadius: 2,
                                    flex: 1,
                                    borderColor: 'grey.300'
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
                            bgcolor: '#000',
                            color: 'white',
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                bgcolor: '#333'
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