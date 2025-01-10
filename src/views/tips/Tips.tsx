import { useState } from 'react';
import {
    Box,
    Typography,
    Card,
    CardContent,
    IconButton,
    Grid,
    styled,
    Button,
    Stack
} from '@mui/material';
// import { useNavigate } from 'react-router-dom';
import TrashIcon from '../../components/Icones/TrashIcon';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import TipIcon from '../../components/Icones/TipsIcon';
import EditIcon from '../../components/Icones/EditIcon';
import NewTip from '../../components/Drawer/tips/NewTip';
import TipDetails from '../../components/Drawer/tips/TipDetails';

// Interfaces

interface Tips {
    id: number;
    tip: string;

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

    // Add these handlers inside the Dashboard component:
    const handleNewUser = (data: any) => {
        console.log('New service data:', data);
        setIsDrawerOpen(false);
        // Handle the new service data here
    };
    // const navigate = useNavigate();
    // Sample data
    const tips: Tips[] = [
        { id: 1, tip: "Always rotate your tires regularly" },
        { id: 2, tip: "Check tire pressure monthly" },
        { id: 3, tip: "Inspect tire treads for wear" },
        { id: 4, tip: "Balance tires every 6,000 miles" },
        { id: 5, tip: "Rotate tires every 6,000–8,000 miles" },
        { id: 6, tip: "Align wheels annually" },
        { id: 7, tip: "Replace tires when tread depth is below 2/32 of an inch" },
        { id: 8, tip: "Keep spare tire properly inflated" },
        { id: 9, tip: "Regularly clean tires with mild soap and water" },
        { id: 10, tip: "Inspect tires for cuts, punctures, or bulges" },
        { id: 11, tip: "Store tires in a cool, dry place when not in use" },
    ];

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


            {/* Stats Cards */}
            <Grid container spacing={3} sx={{ mb: 3 }}>
                {[
                    { value: '47', label: 'Tips' },
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
                {tips.map((tip, index) => (
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
                                {tip.tip}
                            </Typography>
                        </Box>


                        {/* Actions */}
                        <Box sx={{
                            display: 'flex', width: 50, justifyContent: 'flex-end', gap: 2,
                            ml: 'auto'
                        }}>
                            <IconButton size="small">
                                <TrashIcon stroke='#141B34' fill='' />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#FB7C37' }} onClick={() => { setIsTipDetailsDrawerOpen(true) }}>
                                <EditIcon fill='#111111' />
                            </IconButton>
                            <IconButton size="small" sx={{ color: '#FB7C37' }} onClick={() => { setIsTipDetailsDrawerOpen(true) }}>
                                <TipIcon fill='#111111' />
                            </IconButton>
                        </Box>
                    </Box>
                ))}
            </Grid>

            {/* <Grid item xs={12} md={4}>
            </Grid> */}


            <CustomDrawer
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                title="New Tip"
            >
                <NewTip
                    onSubmit={handleNewUser}
                />
            </CustomDrawer>
            <CustomDrawer
                open={isTipDetailsDrawerOpen}
                onClose={() => setIsTipDetailsDrawerOpen(false)}
                title="Tip Details"
            >
                <TipDetails
                    onSubmit={() => console.log('Submitting')}
                />
            </CustomDrawer>

        </Box>
    );
};

export default Tips
