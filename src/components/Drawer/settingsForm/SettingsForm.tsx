import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import SecurityIcon from '@mui/icons-material/Security';
import DescriptionIcon from '@mui/icons-material/Description';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

interface SettingsFormProps {
    onClose: () => void;
    onSubmit: (data: any) => void;

}

const SettingsForm = ({ onSubmit, onClose }: SettingsFormProps) => {
    const [paymentMethods, setPaymentMethods] = useState({
        card: false,
        mtnMomo: false,
        orangeMoney: false
    });

    console.log("close", onClose);


    const handleToggle = (method: 'card' | 'mtnMomo' | 'orangeMoney') => {
        setPaymentMethods(prev => ({
            ...prev,
            [method]: !prev[method]
        }));
    };

    const handleSave = () => {
        // Handle save logic here
        console.log('Saving settings:', paymentMethods);
        onSubmit(paymentMethods);
    };

    return (
        <Box >
            {/* Header */}
            {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h6">Settings</Typography>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </Box> */}

            <Stack spacing={3}>
                {/* Payment Methods Section */}
                <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 15C15 15.8284 15.6716 16.5 16.5 16.5C17.3284 16.5 18 15.8284 18 15C18 14.1716 17.3284 13.5 16.5 13.5C15.6716 13.5 15 14.1716 15 15Z" stroke="#111111" stroke-width="1.5" />
                            <path d="M15.0038 7.80257C9.57619 7.42647 5.1047 6.62109 3 5.99976V15.0612C3 17.0556 3 18.0528 3.61958 18.8661C4.23916 19.6794 5.08923 19.9091 6.78937 20.3685C9.53623 21.1107 12.4235 21.5527 15.0106 21.8055C17.6919 22.0675 19.0325 22.1985 20.0163 21.2995C21 20.4005 21 18.9564 21 16.068V14.0544C21 11.2495 21 9.84706 20.1929 8.97664C19.3859 8.10622 17.9252 8.005 15.0038 7.80257Z" stroke="#111111" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M17.6258 8C18.0035 6.57673 18.3453 3.98822 17.327 2.70292C16.6816 1.88827 15.7223 1.96654 14.7818 2.04926C9.83791 2.48406 6.34544 3.36731 4.39301 3.96737C3.55348 4.2254 3 5.04522 3 5.96044" stroke="#111111" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                        <Typography variant="subtitle1">Manage Payment Methods</Typography>
                    </Box>

                    <Stack spacing={2} sx={{ pl: 4 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>Card</Typography>
                            <Switch
                                checked={paymentMethods.card}
                                onChange={() => handleToggle('card')}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>MTN MoMo</Typography>
                            <Switch
                                checked={paymentMethods.mtnMomo}
                                onChange={() => handleToggle('mtnMomo')}
                            />
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography>Orange Money</Typography>
                            <Switch
                                checked={paymentMethods.orangeMoney}
                                onChange={() => handleToggle('orangeMoney')}
                            />
                        </Box>
                    </Stack>
                </Box>

                <Divider />

                {/* Privacy Policy Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                    }}
                >
                    <SecurityIcon />
                    <Typography variant="subtitle1">Privacy Policy</Typography>
                </Box>

                <Divider />

                {/* Terms & Conditions Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 1,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                    }}
                >
                    <DescriptionIcon />
                    <Typography variant="subtitle1">Terms & Conditions</Typography>
                </Box>

                {/* Save Button */}
                <Box sx={{ mt: 4 }}>
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSave}
                        sx={{
                            color: 'white',
                            bgcolor: '#000',
                            '&:hover': { bgcolor: '#333' }
                        }}
                    >
                        Save
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default SettingsForm;