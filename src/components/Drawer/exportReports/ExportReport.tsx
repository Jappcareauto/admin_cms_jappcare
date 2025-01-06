import { useState } from 'react';
import {
    Box,
    Typography,
    Avatar,
    Switch,
    ToggleButtonGroup,
    ToggleButton,
    Button,
    TextField,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import LocationIcon from '../../Icones/LocationIcon';

interface ExportReportProps {
    onSubmit: (data: any) => void;
}

const StyledSwitch = styled(Switch)({
    '& .MuiSwitch-switchBase.Mui-checked': {
        color: '#FF7A00',
        '&:hover': {
            backgroundColor: 'rgba(255, 122, 0, 0.08)',
        },
    },
    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
        backgroundColor: '#FF7A00',
    },
});

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
    border: 'none',
    borderRadius: '20px !important',
    padding: '6px 16px',
    textTransform: 'none',
    fontSize: '12px',

    color: theme.palette.text.secondary,
    '&.Mui-selected': {
        backgroundColor: '#FF7A00',
        color: '#fff',
        '&:hover': {
            backgroundColor: '#FF7A00',
        },
    },
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)({
    backgroundColor: 'rgba(175, 169, 169, 0.2)',
    borderRadius: 20,
    gap: 4,
    padding: 4,
    '& .MuiToggleButtonGroup-grouped': {
        border: 'none',
        '&:not(:first-of-type)': {
            borderRadius: 20,
        },
        '&:first-of-type': {
            borderRadius: 20,
        },
    },
});

const ExportReport = ({ onSubmit }: ExportReportProps) => {
    const [dateRange, setDateRange] = useState('thisWeek');
    const [exportOptions, setExportOptions] = useState({
        revenue: true,
        emergencyRequests: true,
        vinReports: true,
        appointments: true,
        users: false,
        orders: true,
    });

    const handleDateRangeChange = (_event: React.MouseEvent<HTMLElement>, newValue: string) => {
        if (newValue !== null) {
            setDateRange(newValue);
        }
    };

    console.log("Submit", onSubmit);


    return (
        <Box >

            {/* Profile Section */}
            <Avatar
                sx={{
                    width: 64,
                    height: 64,
                    bgcolor: '#111111',
                    color: '#FF7A00',
                    fontSize: '22px',
                    fontWeight: 600,
                    border: '2px solid #FF7A00',
                    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                }}
            >
                DG
            </Avatar>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>

                <Box >
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Dave's Garage
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon fill="#FF7A00" stroke="#FF7A00" />
                        <Typography variant="body2" color="text.secondary">
                            Deido, Douala
                        </Typography>
                        <StarIcon sx={{ color: '#FF7A00', fontSize: 16 }} />
                        <Typography variant="body2" color="text.secondary">
                            4.75
                        </Typography>
                    </Box>
                </Box>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2 }}>
                Select Data to Export
            </Typography>

            {/* Export Options */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 3 }}>
                {Object.entries(exportOptions).map(([key, value]) => (
                    <Box key={key} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}</Typography>
                        <StyledSwitch
                            checked={value}
                            onChange={(e) => setExportOptions(prev => ({ ...prev, [key]: e.target.checked }))}
                        />
                    </Box>
                ))}
            </Box>

            {/* Date Range Selection */}
            <Typography variant="subtitle2" sx={{ mb: 1 }}>Date Range</Typography>
            <StyledToggleButtonGroup
                value={dateRange}
                exclusive
                onChange={handleDateRangeChange}
                fullWidth
                sx={{ mb: 2 }}
            >
                <StyledToggleButton value="thisWeek">This Week</StyledToggleButton>
                <StyledToggleButton value="thisMonth">This Month</StyledToggleButton>
                <StyledToggleButton value="ytd">YTD</StyledToggleButton>
                <StyledToggleButton value="custom">Custom</StyledToggleButton>
            </StyledToggleButtonGroup>

            {/* <Typography variant="subtitle2" sx={{ mb: 1 }}>Custom</Typography> */}
            <Box sx={{ display: 'flex', gap: 2, mb: 3, mt: 1 }}>
                <TextField
                    size="small"
                    label="From"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                />
                <TextField
                    size="small"
                    label="To"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2,
                        }
                    }}
                />
            </Box>

            {/* Download Button */}
            <Button
                variant="contained"
                fullWidth
                sx={{
                    bgcolor: 'black',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 1.5,
                    '&:hover': {
                        bgcolor: '#333',
                    },
                }}
            >
                Download Report
            </Button>
        </Box>
    );
};

export default ExportReport;