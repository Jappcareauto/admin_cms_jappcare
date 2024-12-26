import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Product from '../../../interfaces/Interfaces';
import image9 from '../../assets/image 9.png'
import image10 from '../../assets/image 10.png'
import image11 from '../../assets/image 11.png'
import image12 from '../../assets/image 12.png'
import Images from '../../../assets/Images/Images';

interface Review {
    rating: number;
    comment: string;
    user: string;
    date: string;
}

interface ProductDetailsProps {
    onEdit: () => void;
    onCancel: () => void;
    product: Product;
}

const ProductDetails = ({ product, onEdit, onCancel }: ProductDetailsProps) => {
    const reviews: Review[] = [
        {
            rating: 4,
            comment: 'These headlights look absolutely amazing! Recommend this product 100%',
            user: 'Donald',
            date: 'Yesterday'
        },
        // Add more reviews as needed
    ];

    return (
        <Box >
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
                        {product.price}
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
            {product.reviews && product.reviews.length > 0 && (
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
            )}

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 2 }}>
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
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onCancel}
                    sx={{
                        py: 1.5,
                        borderColor: '#000',
                        color: '#000',
                        '&:hover': {
                            borderColor: '#333',
                            bgcolor: 'transparent'
                        }
                    }}
                >
                    Cancel
                </Button>
            </Box>
        </Box>
    );
};

export default ProductDetails;