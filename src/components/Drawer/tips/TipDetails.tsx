import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Typography, Alert, IconButton, CircularProgress } from '@mui/material';
import { Close } from '@mui/icons-material';
import { JC_Services } from '../../../services';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import ConfirmDialog from '../../dialogs/DeleteDialog';


interface TipDetailsProps {
    tipId?: string | number;
    initialEditMode?: boolean; // Add this prop
    onSubmit: (data: any) => void;
    onClose: () => void;
}

interface TipData {
    id?: string | number;
    title: string;
    description: string;
}

const TipDetails = ({ tipId, initialEditMode = false, onSubmit, onClose }: TipDetailsProps) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tipData, setTipData] = useState<TipData>({
        title: '',
        description: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


    const connectedUsers: iUsersConnected = useSelector((state: iUsersConnected) => state);
    const token = connectedUsers.accessToken;

    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    useEffect(() => {
        setIsEditMode(initialEditMode);
    }, [initialEditMode]);

    // Fetch tip details when component mounts if tipId is provided
    useEffect(() => {
        if (tipId) {
            fetchTipDetails(tipId);
        }
    }, [tipId]);

    const fetchTipDetails = async (id: string | number) => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `tip/${id}`, 'GET', {}, token);
            console.log("fetchTipDetailsResp", response);

            if (response && response.body.meta.statusCode === 200) {
                setTipData(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching tip details');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
        setLoading(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setTipData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);
        console.log("onSubmit", onSubmit);

        try {
            const response = await JC_Services('JAPPCARE', `tip/${tipId}`, 'PUT', {
                title: tipData.title,
                description: tipData.description
            }, token);

            console.log("updateTipResp", response);

            if (response && (response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201)) {
                setSuccessMessage("Tip updated successfully");
                setIsEditMode(false);
                // Optionally refresh the tip details
                if (tipId) fetchTipDetails(tipId);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage(response.body.meta.message || 'Error updating tip');
            }
        } catch (error) {
            console.error("Error updating tip:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    const handleDelete = async () => {
        setOpenConfirmDialog(true);
    };

    const confirmDelete = async () => {
        setLoading(true);
        setOpenConfirmDialog(false);

        try {
            const response = await JC_Services('JAPPCARE', `tip/${tipId}`, 'DELETE', {}, token);
            console.log("deleteTipResp", response);

            if (response && response.body.meta.statusCode === 200) {
                setSuccessMessage("Tip deleted successfully");
                setTimeout(() => {
                    onClose();
                }, 1500);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage(response.body.meta.message || 'Error deleting tip');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };


    return (
        <Box
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Success and Error Messages */}
            <>
                {successMessage && (
                    <Alert
                        severity="success"
                        sx={{ mb: 2 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={handleCloseMessage}
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
                                onClick={handleCloseMessage}
                            >
                                <Close fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {errorMessage}
                    </Alert>
                )}
            </>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50%' }}>
                    <CircularProgress />
                </Box>
            ) : isEditMode ? (
                // Edit Mode
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 0,
                        pb: 9,
                        pt: 3
                    }}
                >
                    <Stack spacing={3}>
                        <TextField
                            fullWidth
                            label="Tip Summary"
                            placeholder='e.g Always rotate your car tires regularly'
                            name="title"
                            value={tipData.title}
                            onChange={handleChange}
                            required
                        />

                        <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={tipData.description}
                            onChange={handleChange}
                            multiline
                            rows={4}
                            required
                        />
                    </Stack>
                </Box>
            ) : (
                // View Mode
                <Box
                    sx={{
                        flex: 1,
                        overflow: 'auto',
                        p: 0,
                        pb: 9
                    }}
                >
                    <Box>
                        <Typography variant='body1' color='#FB7C37'>
                            Tip
                        </Typography>
                        <Typography>
                            {tipData.title}
                        </Typography>
                    </Box>
                    <Box sx={{ mt: 2 }}>
                        <Typography variant='body1' color='#FB7C37'>
                            Description
                        </Typography>
                        <Typography>
                            {tipData.description}
                        </Typography>
                    </Box>
                </Box>
            )}

            {/* Buttons Section */}
            <Box
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    p: 0,
                    zIndex: 1
                }}
            >
                {isEditMode ? (
                    // Edit Mode Buttons
                    <>
                        <Box sx={{
                            display: 'flex',
                            gap: 2
                        }}>
                            <Button
                                fullWidth
                                variant="contained"
                                type="submit"
                                onClick={handleSubmit}
                                sx={{
                                    color: 'white',
                                    bgcolor: '#000',
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#333', borderColor: '#333' }
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Save Changes'}
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                onClick={() => setIsEditMode(false)}
                                sx={{
                                    color: 'black',
                                    borderColor: 'black',
                                    py: 1.5,
                                    '&:hover': { borderColor: '#666' }
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </>
                ) : (
                    // View Mode Buttons
                    <>
                        {/* View Mode Buttons */}
                        <Box sx={{
                            display: 'flex',
                            gap: 2
                        }}>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => setIsEditMode(true)}
                                sx={{
                                    color: 'white',
                                    bgcolor: '#000',
                                    py: 1.5,
                                    '&:hover': { bgcolor: '#333', borderColor: '#333' }
                                }}
                            >
                                Edit Tip
                            </Button>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                onClick={handleDelete}
                                sx={{
                                    py: 1.5,
                                    '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.04)' }
                                }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Delete Tip'}
                            </Button>
                        </Box>
                    </>
                )}
            </Box>

            <ConfirmDialog
                open={openConfirmDialog}
                title="Confirm Deletion"
                message="Are you sure you want to delete this tip? This action cannot be undone."
                onConfirm={() => {
                    confirmDelete();
                    setOpenConfirmDialog(false);
                }}
                onCancel={() => setOpenConfirmDialog(false)}
                confirmText="Delete"
                cancelText="Cancel"
            />

        </Box>
    );
};

export default TipDetails;