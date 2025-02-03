import { Box, Typography, Avatar, Chip, Alert, IconButton } from '@mui/material';
import CalendarIcon from '../../Icones/calendarIcon';
import { useEffect, useState } from 'react';
import { Close } from '@mui/icons-material';

export interface OrderDetailsInterface {
    id: number;
    user: string;
    status: string;
    orderedDate: string;
    deliveredDate: string;
    address: string;
    items: {
        name: string;
        price: string;
    }[];
    total: string;
}



const OrderDetails = ({ order }: { order: OrderDetailsInterface }) => {
    const [OrderData, setOrderData] = useState<OrderDetailsInterface>();
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    useEffect(() => {
        return setOrderData(order);
    }, []);

    console.log("OrderData========", OrderData);


    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <Box >

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
            {/* Header with User Info */}
            <Box sx={{ display: 'flex', alignItems: "center", gap: 1.5, mb: 4, justifyContent: 'space-between' }}>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    width: '200px', // Fixed width for user section
                }}>
                    <Avatar sx={{
                        width: 60,
                        height: 60,
                        bgcolor: '#1A1D1F',
                        fontSize: '16px',
                        fontWeight: 600,
                        color: '#FF7A00',
                        border: '2px solid #FF7A00',
                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)', // Adjust thickness and color

                    }}>
                        SM
                    </Avatar>
                    <Typography sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                        fontSize: '0.938rem'
                    }}>
                        {order.user}
                    </Typography>
                </Box>
                <Box >

                    <Chip
                        label={order.status}
                        size="small"
                        sx={{
                            mt: 0.5,
                            borderRadius: '16px',
                            bgcolor: '#C4FFCD',
                            color: '#16A34A',
                            height: '34px',
                            fontSize: '0.75rem',
                            padding: '12px 10px',
                            fontWeight: 500,
                            '& .MuiChip-label': {
                                px: 2
                            }
                        }}
                    />
                </Box>
            </Box>

            {/* Order Dates */}
            <Box sx={{ mb: 3 }}>
                <Box sx={{ mb: 2 }}>
                    <Typography
                        color="#FF7A00"
                        variant="body2"
                        sx={{ mb: 0.5, fontSize: '0.875rem' }}
                    >
                        Ordered
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon fill='' stroke='#111111' />
                        <Typography variant="body1">
                            {order.orderedDate}
                        </Typography>
                    </Box>
                </Box>
                <Box>
                    <Typography
                        color="#FF7A00"
                        variant="body2"
                        sx={{ mb: 0.5, fontSize: '0.875rem' }}
                    >
                        Delivered
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CalendarIcon fill='' stroke='#111111' />
                        <Typography variant="body1">
                            {order.deliveredDate}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* Delivery Address */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    color="#FF7A00"
                    variant="body2"
                    sx={{ mb: 0.5, fontSize: '0.875rem' }}
                >
                    Delivery Address
                </Typography>
                <Typography variant="body1">
                    {order.address}
                </Typography>
            </Box>

            {/* Items */}
            <Box sx={{ mb: 3 }}>
                <Typography
                    color="#FF7A00"
                    variant="body2"
                    sx={{ mb: 1.5, fontSize: '0.875rem' }}
                >
                    Items
                </Typography>
                {order.items.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            mb: 1.5,
                            '&:last-child': { mb: 0 }
                        }}
                    >
                        <Typography variant="body1">{item.name}</Typography>
                        <Typography variant="body1" sx={{ color: '#FF7A00' }}>
                            {item.price}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Total */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: '1px solid rgba(0, 0, 0, 0.1)',
                    pt: 2
                }}
            >
                <Typography sx={{ fontWeight: 600 }}>
                    Total
                </Typography>
                <Typography sx={{ color: '#FF7A00', fontWeight: 600 }}>
                    {order.total}
                </Typography>
            </Box>
        </Box>
    );
};

export default OrderDetails;