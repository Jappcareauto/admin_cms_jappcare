import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Grid,
    styled,
    Button,
    Stack,
    Alert
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../components/Icones/TrashIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import TipIcon from '../../components/Icones/TipsIcon';
import EditIcon from '../../components/Icones/EditIcon';
import NewTip from '../../components/Drawer/tips/NewTip';
import TipDetails from '../../components/Drawer/tips/TipDetails';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import ConfirmDialog from '../../components/dialogs/DeleteDialog';

// Interfaces

interface Tips {
    id: string | number;
    title: string;
    description: string;

}

// Styled Components
const StyledCard = styled(Card)(() => ({
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));


const Tips = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isTipDetailsDrawerOpen, setIsTipDetailsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [tips, setTips] = useState<Tips[]>([]);
    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)
    const [selectedTipId, setSelectedTipId] = useState<string | number | null>(null);
    const [successMessage, setSuccessMessage] = useState('');
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);


    console.log("loading", loading);

    // console.log("userconnected", connectedUsers);
    const token = connectedUsers.accessToken
    // Add these handlers inside the Dashboard component:

    // const navigate = useNavigate();

    const fetchTips = async () => {
        setLoading(true);
        try {
            // const params = new URLSearchParams({}).toString();

            const response = await JC_Services('JAPPCARE', `tip/list`, 'POST', {}, token);
            console.log("fecthtipresp", response);
            if (response && response.body.meta.statusCode === 200) {
                // setSuccessMessage('Successful!');
                setTips(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching payments');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchTips();
    }, []);

    const handleDeleteTip = async (tipId: string | number) => {
        setSelectedTipId(tipId);
        setOpenConfirmDialog(true);
    };

    const confirmDeleteTip = async (tipId: string | number) => {
        setLoading(true);
        setOpenConfirmDialog(false);

        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `tip/${tipId}`, 'DELETE', "", token);
            console.log("deleteTipResp", response);
            console.log("tipId", tipId);

            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201 || response.status === 204) {
                handleAlert("Tip deleted successfully", false);
                // Refresh tips list
                fetchTips();
            } else if (response && response.body.meta.statusCode === 401) {
                handleAlert(response.body.meta.message || 'Unauthorized to perform action', true);
            } else {
                handleAlert(response.body.meta.message || 'Error deleting tip', true);
            }
        } catch (error) {
            console.error("Error:", error);
            handleAlert("Network Error Try Again Later!!!!", true);
        }
        setLoading(false);
    };

    // Handle alert messages
    const handleAlert = (message: string, isError: boolean) => {
        if (isError) {
            setErrorMessage(message);
            setTimeout(() => setErrorMessage(''), 6000);
        } else {
            setSuccessMessage(message);
            setTimeout(() => setSuccessMessage(''), 6000);
        }
    };

    const handleCloseTipDetails = () => {
        setIsTipDetailsDrawerOpen(false);
        setSelectedTipId(null);
        fetchTips(); // Refresh the list in case updates were made
    };

    // Handler for new tip submission
    const handleNewTip = (data: any) => {
        console.log('New tip data:', data);
        setIsDrawerOpen(false);
        // Refresh the tips list after creating a new tip
        fetchTips();
    };

    // Open tip details drawer
    const openTipDetails = (tipId: string | number) => {
        setSelectedTipId(tipId);
        setIsTipDetailsDrawerOpen(true);
    };

    const [isEditModeInitial, setIsEditModeInitial] = useState(false);
    const openTipEdit = (tipId: string | number) => {
        setSelectedTipId(tipId);
        setIsTipDetailsDrawerOpen(true);
        // Pass initialEditMode flag to TipDetails
        setIsEditModeInitial(true);
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            {/* Header */}
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                    <TipIcon fill='#111111' />
                    <Typography variant="h6" fontWeight={600}>
                        Tips
                    </Typography>
                </Box>
                <Stack direction={"row"} spacing={2.5}>
                    <Button onClick={() => setIsDrawerOpen(true)}
                        variant="outlined" sx={{ borderRadius: 2, mb: 2, color: 'black', borderColor: 'black', padding: "20px 16px", width: 101, height: 40 }}>
                        New Tip
                    </Button>

                </Stack>


            </Box>
            {/* Alert Messages */}
            {successMessage && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {successMessage}
                </Alert>
            )}

            {errorMessage && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {errorMessage}
                </Alert>
            )}

            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {[
                    { value: `${tips.length}`, label: 'Total Tips' },
                ].map((stat, index) => (
                    <Grid item xs={12} md={3} key={index}>
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                                    <TipIcon fill='#FB7C37' />
                                </Box>
                                <Box>
                                    <Typography variant="h4" color="#000000" fontWeight="bold">
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>

            <Grid item xs={12} md={8}>
                {/* Appointments List */}

                {
                    tips.length > 0 ? (

                        tips.map((tip, index) => (
                            <Box
                                key={tip.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    p: 1,
                                    borderBottom: index !== tips.length - 1 ? '1px solid #E4E4E4' : 'none',
                                }}
                            >


                                {/* User */}
                                <Box sx={{ width: 300, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>
                                        {tip.title}
                                    </Typography>
                                </Box>


                                {/* Actions */}
                                <Box sx={{
                                    display: 'flex', width: 50, justifyContent: 'flex-end', gap: 2,
                                    ml: 'auto'
                                }}>
                                    <IconButton size="small" onClick={() => handleDeleteTip(tip.id)} disabled={loading}>
                                        <TrashIcon stroke='#141B34' fill='' />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: '#FB7C37' }} onClick={() => openTipEdit(tip.id)}
                                    >
                                        <EditIcon fill='#111111' />
                                    </IconButton>
                                    <IconButton size="small" sx={{ color: '#FB7C37' }} onClick={() => openTipDetails(tip.id)}
                                    >
                                        <TipIcon fill='#111111' />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))
                    ) : (
                        <Box sx={{
                            p: 4,
                            textAlign: 'center',
                            border: '1px dashed #ccc',
                            borderRadius: 2,
                            bgcolor: '#f9f9f9'
                        }}>
                            <Typography color="text.secondary">
                                No Tips available. Add a new user to get started.
                            </Typography>
                        </Box>
                    )
                }
            </Grid>

            {/* <Grid item xs={12} md={4}>
            </Grid> */}


            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="New Tip"
            >
                <NewTip
                    onSubmit={handleNewTip}
                />
            </CustomDrawer>
            {/* Tip Details Drawer */}
            <CustomDrawer
                open={isTipDetailsDrawerOpen}
                onClose={() => {
                    handleCloseTipDetails();
                    setIsEditModeInitial(false); // Reset the flag
                }}
                title="Tip Details"
            >
                <TipDetails
                    tipId={selectedTipId || ''}
                    initialEditMode={isEditModeInitial}
                    onSubmit={() => console.log('Submitting')}
                    onClose={() => {
                        handleCloseTipDetails();
                        setIsEditModeInitial(false); // Reset the flag
                    }}
                />
            </CustomDrawer>


            <ConfirmDialog
                open={openConfirmDialog}
                title="Confirm Deletion"
                message="Are you sure you want to delete this tip? This action cannot be undone."
                onConfirm={() => {
                    confirmDeleteTip(selectedTipId!);
                    setOpenConfirmDialog(false);
                }}
                onCancel={() => setOpenConfirmDialog(false)}
                confirmText="Delete"
                cancelText="Cancel"
            />

        </Box>
    );
};

export default Tips
