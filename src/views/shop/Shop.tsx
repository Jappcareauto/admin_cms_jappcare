import { useState } from 'react';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Avatar,
    Chip,
    Button,
    TextField,
    IconButton,
    InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LineChart, Line, XAxis, ResponsiveContainer } from 'recharts';
import SearchIcon from '@mui/icons-material/Search';
import PieChartIcon from '../../components/Icones/PieChartIcon';
import NotifIcon from '../../components/Icones/NotifIcon';
import ShopIcon from '../../components/Icones/ShopIcon';
import image9 from '../../assets/image 9.png'
import image10 from '../../assets/image 10.png'
import image11 from '../../assets/image 11.png'
import image12 from '../../assets/image 12.png'
import CustomDrawer from '../../components/Drawer/CustomDrawer';
import ProductDetails from '../../components/Drawer/products/ProductDetails';
import Product from '../../interfaces/Interfaces';
import NewProductForm from '../../components/Drawer/products/NewProductForm';
import { useNavigate } from 'react-router-dom';

// Sample data for the revenue chart
const revenueData = [
    { name: 'Mon', value: 1500 },
    { name: 'Tues', value: 12000 },
    { name: 'Wed', value: 22000 },
    { name: 'Thurs', value: 20000 },
    { name: 'Fri', value: 25000 },
    { name: 'Sat', value: 28000 },
];

// Sample product data
const products: Product[] = [
    {
        id: 1,
        name: 'Porsche 911 Matrix LED Headlights',
        price: '5,000 Frs',
        image: image10,
        rating: 4.5,
        description: 'High-performance LED headlights designed specifically for the Porsche 911, providing superior illumination and modern styling.',
        reviews: [
            {
                rating: 4,
                comment: 'Excellent quality and perfect fit for my 911!',
                user: 'Michael',
                date: 'Yesterday'
            }
        ]
    },
    {
        id: 2,
        name: 'BMW M5 Turbocharged V8 Engine',
        price: '6,000 Frs',
        image: image9,
        rating: 4.8,
        description: 'High-performance V8 engine for BMW M5, delivering exceptional power and reliability.',
        reviews: [
            {
                rating: 5,
                comment: 'Amazing performance upgrade, totally worth it!',
                user: 'Sarah',
                date: '2 days ago'
            }
        ]
    },
    {
        id: 3,
        name: 'Lamborghini Urus V10 Front Bumper',
        price: '7,000 Frs',
        image: image11,
        rating: 4.7,
        description: 'Original Lamborghini Urus front bumper, perfect for replacements or upgrades.',
        reviews: [
            {
                rating: 4,
                comment: 'Perfect fit and great quality materials.',
                user: 'David',
                date: 'Last week'
            }
        ]
    },
    {
        id: 4,
        name: 'Porsche Macan Headlights',
        price: '10,000 Frs',
        image: image12,
        rating: 4.6,
        description: 'Premium quality headlights for Porsche Macan, featuring advanced LED technology.',
        reviews: [
            {
                rating: 5,
                comment: 'These headlights transformed the look of my Macan!',
                user: 'Emma',
                date: '3 days ago'
            }
        ]
    },
];

// Sample orders data
const orders = [
    {
        id: 1,
        customer: 'James Mann',
        product: 'Lamborghini Urus Headlight',
        price: '250,000 Frs',
        quantity: 1,
        image: image11
    },
    {
        id: 2,
        customer: 'Emily Scott',
        product: 'Porsche 911 GT3 Tail Light',
        price: '200,000 Frs',
        quantity: 2,
        image: image12
    },
    {
        id: 3,
        customer: 'Emily Scott',
        product: 'Porsche 911 GT3 Tail Light',
        price: '200,000 Frs',
        quantity: 2,
        image: image12
    },
    {
        id: 4,
        customer: 'Emily Scott',
        product: 'Porsche 911 GT3 Tail Light',
        price: '200,000 Frs',
        quantity: 2,
        image: image12
    },
];

const StyledCard = styled(Card)(() => ({

    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
    borderRadius: 20,
    padding: '20px 10px',
    '&.active': {
        backgroundColor: theme.palette.primary.main,
        color: 'white',
    }
}));

const StyledSearchField = styled(TextField)(() => ({
    width: '360px',
    height: 44,
    '& .MuiOutlinedInput-root': {
        borderRadius: 28,
        backgroundColor: '#F5F5F5',

    }
}));

const ProductCard = styled(Card)(({ }) => ({
    borderRadius: 16,
    overflow: 'hidden',
    boxShadow: 'none',
    background: 'white',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    '& .MuiCardContent-root': {
        padding: 0,
    },
}));

const ProductImage = styled('img')({
    width: '100%',
    height: '180px',
    borderRadius: 46,
    objectFit: 'cover',
    display: 'block',
    padding: 25
});

const ProductInfo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(1.5),
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.main,
    fontWeight: 500,
    fontSize: '0.875rem',
}));


const Shop = () => {
    const [activeCategory, setActiveCategory] = useState('Body Kits');
    const [isNewProductsDrawerOpen, setisNewProductsDrawerOpen] = useState(false);
    const [isProductDetailsDrawerOpen, setisProductDetailsDrawerOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const navigate = useNavigate();
    const handleProductClick = (product: Product) => {
        setSelectedProduct(product);
        setisProductDetailsDrawerOpen(true);
    };

    const handleCloseDrawer = () => {
        setisProductDetailsDrawerOpen(false);
        setSelectedProduct(null);
    };

    return (
        <Box sx={{ p: 3, minHeight: '100vh' }}>
            <Grid container spacing={3}>
                {/* Left Column */}
                <Grid item xs={12} md={8}>
                    {/* Stats Cards */}
                    <Grid container spacing={3} sx={{ mb: 3 }}>

                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            128
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Items
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <StyledCard>
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <PieChartIcon fill='#FB7C37' stroke='' />
                                        <Chip label="This Week" size="small" sx={{ bgcolor: 'rgba(175, 169, 169, 0.2)', color: 'text.secondary', padding: '15px 8px 15px 8px' }} />
                                    </Box>
                                    <Box sx={{ mt: 6 }}>
                                        <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                            28,000 Frs
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Revenue
                                        </Typography>
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        </Grid>
                    </Grid>

                    {/* Notification */}
                    <Box sx={{ mb: 3, p: 2, bgcolor: '#FFEDE6', borderRadius: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <NotifIcon stroke='' fill='#000000' />
                                    <Typography>Notification</Typography>
                                </Box>

                            </Box>

                            <IconButton sx={{
                                bgcolor: 'primary.main', color: 'white',
                                '&:hover': {
                                    border: '1px solid rgb(247, 105, 11)',
                                    bgcolor: 'rgb(247, 105, 11)'
                                },
                            }}>
                                <NotifIcon stroke='' fill='#ffffff' />
                            </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography>New Order from <strong>James Mann</strong></Typography>

                        </Box>
                    </Box>

                    {/* Search and Categories */}
                    <Box sx={{ mb: 3 }}>
                        <Box sx={{ mb: 2, justifyContent: 'space-between', display: 'flex', gap: 2 }}>
                            <Box sx={{ mb: 2, alignItems: 'center', display: 'flex', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <ShopIcon fill='#111111' stroke='' />
                                    <Typography variant="h6">Shop</Typography>

                                </Box>

                                <Button
                                    variant="contained"
                                    onClick={() => setisNewProductsDrawerOpen(true)}
                                    sx={{
                                        bgcolor: '#000',
                                        color: 'white',
                                        borderRadius: 2,
                                        py: 1,
                                        '&:hover': {
                                            bgcolor: '#333',
                                            border: '1px solid #333'
                                        }
                                    }}
                                >
                                    Add Product
                                </Button>
                            </Box>

                            <Box sx={{ height: '44px', width: '360px' }}
                            >
                                <StyledSearchField
                                    placeholder="Search Centers"
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                        </Box>

                        <Typography variant="h6" sx={{ mb: 2 }}>Category</Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {['Body Kits', 'Suspension', 'Engines', 'Accessories', 'Interior', 'Tires'].map((category) => (
                                <CategoryChip
                                    key={category}
                                    label={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={activeCategory === category ? 'active' : ''}
                                />
                            ))}
                        </Box>
                    </Box>

                    {/* Products Grid */}
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                                <ProductCard
                                    onClick={() => handleProductClick(product)}
                                    sx={{
                                        cursor: 'pointer',
                                        transition: 'transform 0.2s',
                                        '&:hover': {
                                            transform: 'translateY(-4px)'
                                        }
                                    }}
                                >
                                    <ProductImage
                                        src={product.image}
                                        alt={product.name}
                                    />
                                    <ProductInfo>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                mb: 0.5,
                                                fontWeight: 500,
                                                fontSize: '0.9rem',
                                                color: '#1A1D1F'
                                            }}
                                        >
                                            {product.name}
                                        </Typography>
                                        <ProductPrice>
                                            {product.price}
                                        </ProductPrice>
                                    </ProductInfo>
                                </ProductCard>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Right Column */}
                <Grid item xs={12} md={4}>
                    {/* Revenue Chart */}
                    <StyledCard sx={{ mb: 3 }}>
                        <CardContent>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Chip label="28,000 Frs" color="primary" />
                                <Typography variant="body2" color="text.secondary">Revenue</Typography>
                            </Box>
                            <Box sx={{ height: 100 }}>
                                <ResponsiveContainer>
                                    <LineChart data={revenueData}>
                                        <XAxis dataKey="name" />
                                        <Line type="monotone" dataKey="value" stroke="#FF7A00" />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </StyledCard>

                    {/* Orders */}
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="h6">Orders</Typography>
                            <Button variant="outlined" size="small" onClick={() => navigate("/orderhistory")}>Order History</Button>
                        </Box>

                        {orders.map((order) => (
                            <StyledCard key={order.id} sx={{ mb: 2 }}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', gap: 2 }}>
                                        <Avatar
                                            sx={{
                                                width: 48,
                                                height: 48,
                                                bgcolor: '#1A1D1F',
                                                fontSize: '16px',
                                                fontWeight: 600,
                                                color: '#FF7A00',
                                                border: '2px solid #FF7A00',
                                            }}
                                        >{order.customer.split(' ').map(n => n[0]).join('')}</Avatar>
                                        <Box sx={{ flex: 1 }}>
                                            <Typography variant="subtitle1">{order.customer}</Typography>
                                            <Typography variant="body2">{order.product}</Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                                                <Typography color="primary.main">{order.price}</Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Qty: {order.quantity}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <img
                                            src={order.image}
                                            alt={order.product}
                                            style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }}
                                        />
                                    </Box>
                                </CardContent>
                            </StyledCard>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            <CustomDrawer
                open={isProductDetailsDrawerOpen}
                onClose={handleCloseDrawer}
                title="Product Details"
            >
                {selectedProduct && (
                    <ProductDetails
                        product={selectedProduct}
                        onEdit={() => {
                            // Handle edit functionality
                            console.log('Editing product:', selectedProduct.id);
                        }}
                        onCancel={handleCloseDrawer}
                    />
                )}
            </CustomDrawer>

            <CustomDrawer
                open={isNewProductsDrawerOpen}
                onClose={() => setisNewProductsDrawerOpen(false)}
                title="New Product"
            >
                <NewProductForm
                    onSubmit={() => (console.log('Submitting new product'))}

                />
            </CustomDrawer>
        </Box>
    );
};

export default Shop;