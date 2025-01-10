import { useState } from 'react';
import {
    Box,
    Typography,
    InputBase,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,

} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';



// Styled Components (previous styled components remain the same)
const SearchInput = styled(InputBase)(() => ({
    backgroundColor: '#FFEDE6',
    borderRadius: 28,
    padding: '8px 12px',
    width: '100%',
    '& input': {
        padding: '4px 8px',
    }
}));

const ServiceItem = styled(ListItem)(() => ({
    borderRadius: 8,
    marginBottom: 8,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#FFEDE6',
    }
}));


export interface Service {
    id: string;
    name: string;
    initials: string;
}




const ServiceCenterChats = () => {
    const navigate = useNavigate();

    const [services] = useState<Service[]>([
        { id: 'DA', name: "Dave's Autoshop", initials: 'DA' },
        { id: 'AC', name: 'AutoCare Plus BodyShop', initials: 'DA' },
        { id: 'SL', name: 'Speedy Lube', initials: 'SL' },
        { id: 'MM', name: 'Mega Motors', initials: 'MM' },
        { id: 'WW', name: 'Wheel Wizards', initials: 'WW' },
        { id: 'GG', name: 'Gearheads Garage', initials: 'GG' },
        { id: 'PS', name: 'Pit Stop Pro', initials: 'PS' },
        { id: 'TT', name: 'Turbo Tune-Up', initials: 'TT' },
        { id: 'RR', name: 'Rev it Right', initials: 'RR' },
    ]);

    const handleServiceCenterChats = (row: Service) => {
        navigate(`/chats/${row.id}`, { state: { chatsData: row } });
        console.log("row,", row);
    }


    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Left Sidebar */}
            <Box sx={{ width: 400, borderRight: '1px solid #F0F0F0', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Service Center Chats
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <SearchInput
                        placeholder="Search"
                        startAdornment={<SearchIcon sx={{ color: '#666', mr: 1 }} />}
                    />
                </Box>

                <List sx={{ p: 0 }}>
                    {services.map((service) => (
                        <ServiceItem key={service.id}
                            onClick={() => handleServiceCenterChats(service)}>
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        bgcolor: '#1A1D1F',
                                        color: '#FF7A00',
                                        border: '2px solid #FF7A00',
                                        width: 48,
                                        height: 48,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)',
                                    }}
                                >
                                    {service.initials}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={service.name} />
                        </ServiceItem>
                    ))}
                </List>
            </Box>


        </Box>
    );
};

export default ServiceCenterChats;