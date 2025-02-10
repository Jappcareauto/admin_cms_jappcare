import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
// import Stack from '@mui/material/Stack';
import Images from '../../../assets/Images/Images';
import { Product } from '../../../interfaces';
import { JC_Services } from '../../../services';
import { useEffect, useState } from 'react';
import { iUsersConnected } from '../../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Alert, CircularProgress, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';



interface ProductDetailsProps {
    onEdit: () => void;
    product: Product;
}

const ProductDetails = ({ product, onEdit }: ProductDetailsProps) => {
    const [productData, setProductData] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    console.log("product", productData);


    const fetchProductByID = async () => {
        setLoading(true);
        try {

            const response = await JC_Services('JAPPCARE', `product/${product.id}`, 'GET', "", connectedUsers.accessToken);
            console.log("resp", response);
            if (response && response.status === 200) {
                setSuccessMessage('Successfull!');
                setProductData(response.body);
            } else if (response && response.status === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
            } else {
                setErrorMessage('No Data Found');
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchProductByID();
    }, []);

    const handleCloseMessage = () => {
        setErrorMessage('');
        setSuccessMessage('');
    };

    return (
        <Box >

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
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

                    {/* Main Product Image */}
                    <Box
                        component="img"
                        src={product.image}
                        alt={product.name}
                        sx={{
                            width: '100%',
                            height: '200px',
                            objectFit: 'cover',
                            borderRadius: 2,
                            mb: 2
                        }}
                    />

                    {/* Product Title and Rating */}
                    <Box sx={{ mb: 2 }}>
                        <Typography variant="h6" sx={{ mb: 1 }}>
                            {product.name}
                        </Typography>
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1
                        }}>
                            <Typography
                                variant="h6"
                                sx={{
                                    color: '#FF6B00',
                                    fontWeight: 500
                                }}
                            >
                                {product.price.amount}
                            </Typography>
                            {product.rating && (
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 0.5
                                }}>
                                    <Rating
                                        value={product.rating}
                                        readOnly
                                        precision={0.25}
                                        size="small"
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {product.rating}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Box>

                    {/* Description */}
                    {product.description && (
                        <Typography variant="body2" sx={{ mb: 3 }} color="text.secondary">
                            {product.description}
                        </Typography>
                    )}

                    {/* Images Section */}
                    <Typography variant="subtitle1" sx={{ mb: 2 }}>
                        Images
                    </Typography>
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: 1,
                        mb: 3
                    }}>
                        {[Images.car1, Images.car1, Images.car2, Images.car2].map((img) => (
                            <Box
                                key={img}
                                component="img"
                                src={img} // Replace with actual image paths
                                alt={`Damage view ${img}`}
                                sx={{
                                    width: '100%',
                                    height: '80px',
                                    objectFit: 'cover',
                                    borderRadius: 1
                                }}
                            />
                        ))}
                    </Box>

                    {/* Reviews */}
                    {/* {product.reviews && product.reviews.length > 0 && (
                        <Stack spacing={2} sx={{ mb: 3 }}>
                            <Typography variant="subtitle1">Reviews</Typography>
                            {product.reviews.map((review, index) => (
                                <Box key={index}>
                                    <Rating
                                        value={review.rating}
                                        readOnly
                                        size="small"
                                        sx={{ mb: 1 }}
                                    />
                                    <Typography variant="body2" sx={{ mb: 1 }}>
                                        {review.comment}
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        gap: 1,
                                        color: 'text.secondary'
                                    }}>
                                        <Typography variant="caption">
                                            {review.user}
                                        </Typography>
                                        <Typography variant="caption">•</Typography>
                                        <Typography variant="caption">
                                            {review.date}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    )} */}
                </>
            )
            }




            {/* Actions */}
            <Box sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1,
                p: 2
            }}>
                <Button
                    fullWidth
                    variant="contained"
                    onClick={onEdit}
                    sx={{
                        bgcolor: '#000',
                        color: 'white',
                        py: 1.5,
                        '&:hover': {
                            bgcolor: '#333'
                        }
                    }}
                >
                    Edit Product
                </Button>

            </Box>
        </Box>
    );
};

export default ProductDetails;