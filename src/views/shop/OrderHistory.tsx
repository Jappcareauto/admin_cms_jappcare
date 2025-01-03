import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Chip,
    IconButton,
} from '@mui/material';
import ShopIcon from '../../components/Icones/ShopIcon';
import { styled } from '@mui/material/styles';
import CalendarIcon from '../../components/Icones/calendarIcon';
import TrashIcon from '../../components/Icones/TrashIcon';
import ArrowRight from '../../components/Icones/ArrowRight';
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import OrderDetails, { OrderDetailsInterface } from '../../components/Drawer/orderDetails/OrderDetails';

const StyledCard = styled(Card)(() => ({
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));



const extendedOrders: OrderDetailsInterface[] = [
    {
        id: 1,
        user: 'Sarah Maye',
        status: 'Completed',
        orderedDate: 'Oct. 20, 2024',
        deliveredDate: 'Oct. 22, 2024',
        address: '123 Maplewood Lane, Springfield, IL 62704',
        items: [
            { name: '1x Lamborghini Urus Headlight', price: '125,000 Frs' },
            { name: 'Installation Service', price: '15,000 Frs' },
            { name: 'Express Shipping', price: '5,000 Frs' }
        ],
        total: '145,000 Frs'
    },
    {
        id: 2,
        user: 'Sarah Maye',
        status: 'In Progress',
        orderedDate: 'Nov. 19, 2024',
        deliveredDate: 'Est. Nov. 25, 2024',
        address: '456 Tech Avenue, Silicon Valley, CA 94025',
        items: [
            { name: '2x iPhone 13 Pro Max', price: '$3,000' },
            { name: 'AppleCare+ Coverage', price: '$400' },
            { name: 'Cases & Accessories', price: '$200' }
        ],
        total: '$3,600'
    },
    {
        id: 3,
        user: 'Sarah Maye',
        status: 'Pending',
        orderedDate: 'Dec. 5, 2024',
        deliveredDate: 'Processing',
        address: '789 Wearable Road, Boston, MA 02108',
        items: [
            { name: '3x Apple Watch Series 7', price: '$1,200' },
            { name: 'Apple Watch Bands', price: '$180' },
            { name: 'Watch Care Kit', price: '$60' }
        ],
        total: '$1,440'
    },
    {
        id: 4,
        user: 'Sarah Maye',
        status: 'Pending',
        orderedDate: 'Jan. 10, 2025',
        deliveredDate: 'Processing',
        address: '321 Audio Street, Nashville, TN 37201',
        items: [
            { name: '4x Sony WH-1000XM4 Headphones', price: '$800' },
            { name: 'Extended Warranty', price: '$120' },
            { name: 'Premium Carrying Cases', price: '$100' }
        ],
        total: '$1,020'
    },
    {
        id: 5,
        user: 'Sarah Maye',
        status: 'In Progress',
        orderedDate: 'Feb. 20, 2025',
        deliveredDate: 'Est. Feb. 25, 2025',
        address: '654 Gaming Blvd, Seattle, WA 98101',
        items: [
            { name: '5x Nintendo Switch OLED Model', price: '$1,500' },
            { name: 'Pro Controllers', price: '$350' },
            { name: 'Game Bundle', price: '$300' }
        ],
        total: '$2,150'
    },
    {
        id: 6,
        user: 'Sarah Maye',
        status: 'Completed',
        orderedDate: 'Mar. 15, 2025',
        deliveredDate: 'Mar. 18, 2025',
        address: '987 Mobile Lane, Austin, TX 78701',
        items: [
            { name: '6x Samsung Galaxy S21 Ultra', price: '$4,200' },
            { name: 'Samsung Care+', price: '$540' },
            { name: 'Accessory Package', price: '$300' }
        ],
        total: '$5,040'
    },
    {
        id: 7,
        user: 'Sarah Maye',
        status: 'Pending',
        orderedDate: 'Apr. 5, 2025',
        deliveredDate: 'Processing',
        address: '753 Sound Street, Miami, FL 33101',
        items: [
            { name: '7x Bose QuietComfort 45 Headphones', price: '$1,000' },
            { name: 'Protection Plan', price: '$150' },
            { name: 'Travel Cases', price: '$140' }
        ],
        total: '$1,290'
    },
    {
        id: 8,
        user: 'Sarah Maye',
        status: 'Pending',
        orderedDate: 'May. 10, 2025',
        deliveredDate: 'Processing',
        address: '159 Fitness Way, Portland, OR 97201',
        items: [
            { name: '8x Fitbit Charge 5', price: '$400' },
            { name: 'Extra Bands', price: '$160' },
            { name: 'Fitbit Premium Subscription', price: '$80' }
        ],
        total: '$640'
    },
    {
        id: 9,
        user: 'Sarah Maye',
        status: 'In Progress',
        orderedDate: 'Jun. 20, 2025',
        deliveredDate: 'Est. Jun. 25, 2025',
        address: '357 Reader Avenue, Chicago, IL 60601',
        items: [
            { name: '9x Amazon Kindle Paperwhite', price: '$900' },
            { name: 'Protective Covers', price: '$180' },
            { name: 'Kindle Unlimited Bundle', price: '$90' }
        ],
        total: '$1,170'
    },
    {
        id: 10,
        user: 'Sarah Maye',
        status: 'In Progress',
        orderedDate: 'Jul. 15, 2025',
        deliveredDate: 'Est. Jul. 20, 2025',
        address: '852 Action Cam Road, Denver, CO 80201',
        items: [
            { name: '10x GoPro HERO 10 Black', price: '$5,000' },
            { name: 'Accessory Bundle', price: '$800' },
            { name: 'Extended Warranty', price: '$500' }
        ],
        total: '$6,300'
    }
];

const orders = extendedOrders.map(order => ({
    id: order.id,
    user: order.user,
    item: order.items[0].name,
    price: order.items[0].price,
    date: order.orderedDate,
    status: order.status
}));


const OrderHistory = () => {
    // const [activeCategory, setActiveCategory] = useState('Body Kits');
    // const [isNewProductsDrawerOpen, setisNewProductsDrawerOpen] = useState(false);
    const [isOrderDetailsDrawerOpen, setisOrderDetailsDrawerOpen] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<OrderDetailsInterface | null>(null);


    // const handleOrderClick = (order: OrderDetailsInterface) => {
    //     setSelectedOrder(order);
    //     setisProductDetailsDrawerOpen(true);
    // };

    const handleOrderClick = (orderId: number) => {
        const orderDetails = extendedOrders.find(order => order.id === orderId);
        if (orderDetails) {
            setSelectedOrder(orderDetails);
            setisOrderDetailsDrawerOpen(true);
        }
    };

    const handleCloseDrawer = () => {
        setisOrderDetailsDrawerOpen(false);
        setSelectedOrder(null);
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>

            {/* Header */}

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                <ShopIcon fill='#111111' stroke='' />
                <Typography variant="h6" fontWeight={600} >Order History</Typography>

            </Box>

            {/* Status Chips */}
            <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                <Chip
                    label="Pending"
                    sx={{
                        borderRadius: 28,
                        bgcolor: 'rgba(255, 112, 67, 0.1)',
                        padding: '20px 14px 20px 14px',
                        color: '$111111',
                        '&:hover': { bgcolor: 'rgba(255, 112, 67, 0.2)' }
                    }}
                />
                <Chip
                    label="In Progress"
                    sx={{
                        padding: '20px 14px 20px 14px',
                        borderRadius: 28,
                        bgcolor: '#FB7C37',
                        color: 'white',
                    }}
                />
                <Chip
                    label="Delivered"
                    sx={{
                        padding: '20px 14px 20px 14px',
                        borderRadius: 28,
                        bgcolor: '#F3F4F6',
                        color: 'text.secondary',
                    }}
                />
            </Box>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid item xs={12} md={3}>
                    <StyledCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                <ShopIcon fill='#FB7C37' stroke='' />
                            </Box>
                            <Box sx={{ mt: 6 }}>
                                <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                    5685
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0 }}>
                                    Current Orders
                                </Typography>
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>
                <Grid item xs={12} md={3}>
                    <StyledCard>
                        <CardContent>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                <ShopIcon fill='#FB7C37' stroke='' />
                            </Box>
                            <Box sx={{ mt: 6 }}>
                                <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                    128
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0 }}>
                                    Total Orders
                                </Typography>
                            </Box>
                        </CardContent>
                    </StyledCard>
                </Grid>
            </Grid>

            {/* Orders Section */}
            <Box sx={{ mt: 3 }}>


                {/* Orders List Card */}
                <Card sx={{
                    bgcolor: 'background.paper',
                    width: '100%',
                    borderStyle: 'none',
                }}>
                    {orders.map((order) => (
                        <Box
                            key={order.id}
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                p: 1,
                                borderBottom: '1px solid #E4E4E4',
                                '&:last-child': { borderBottom: 'none' }
                            }}
                        >
                            {/* User Section */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 2,
                                width: '200px', // Fixed width for user section
                            }}>
                                <Avatar sx={{
                                    width: 48,
                                    height: 48,
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

                            {/* Item Section */}
                            <Typography sx={{

                                color: 'text.primary',
                                fontSize: '0.875rem',
                                flex: 1,
                                pl: 2
                            }}>
                                {order.item}
                            </Typography>

                            <Typography sx={{
                                color: '#FF7A00',
                                fontWeight: 500,
                                fontSize: '0.938rem',
                                flex: 1,
                                pl: 2,
                                textAlign: 'left'
                            }}>
                                {order.price}
                            </Typography>

                            <Typography sx={{
                                color: 'text.secondary',
                                fontSize: '0.938rem',
                                flex: 1,
                                // pl: 2,
                                textAlign: 'center',
                                alignItems: 'center',
                                display: 'flex',
                            }}>
                                <Box sx={{ width: 150, display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CalendarIcon stroke='#777777' fill='' />
                                    {order.date}
                                </Box>
                            </Typography>


                            <Chip
                                label={order.status}
                                size="small"
                                sx={{
                                    flex: 1,
                                    pl: 2,
                                    mr: 8,
                                    textAlign: 'left',
                                    padding: "12px 1px",
                                    borderRadius: '16px',
                                    bgcolor: "rgba(146, 143, 139, 0.1)",
                                    // minWidth: '100px',
                                    height: '34px',
                                    fontSize: '0.813rem',
                                    fontWeight: 500,
                                    '& .MuiChip-label': {
                                        px: 2
                                    }
                                }}
                            />

                            {/* Price and Actions Section */}
                            <Box sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                                ml: 'auto'
                            }}>


                                <IconButton
                                    size="small"
                                    sx={{
                                        color: 'text.secondary',
                                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                                    }}
                                >
                                    <TrashIcon stroke='#141B34' fill='' />
                                </IconButton>
                                <IconButton
                                    sx={{
                                        color: 'FF7A00',
                                        '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.04)' }
                                    }}
                                    onClick={() => handleOrderClick(order.id)}
                                >
                                    <ArrowRight fill='#FF7A00' />
                                </IconButton>
                            </Box>
                        </Box>
                    ))}
                </Card>
            </Box>

            <CustomDrawer
                open={isOrderDetailsDrawerOpen}
                onClose={handleCloseDrawer}
                title="Order Details"
            >
                {selectedOrder && (
                    <OrderDetails
                        order={selectedOrder}
                    />
                )}
            </CustomDrawer>
        </Box>
    );
};

export default OrderHistory;