// ImageViewer.tsx
import { useState } from 'react';
import { Modal, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface ImageViewerProps {
    open: boolean;
    onClose: () => void;
    images: string[];
    initialIndex?: number;
}

export const ImageViewer = ({
    open,
    onClose,
    images,
    initialIndex = 0
}: ImageViewerProps) => {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    const handlePrevious = () => {
        setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const handleThumbnailClick = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <Modal
            open={open}
            onClose={onClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box sx={{
                width: '900px',
                height: '700px',
                bgcolor: 'rgba(0, 0, 0, 0.7)',
                borderRadius: 2,
                outline: 'none',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
            }}>
                {/* Close button */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 8,
                        color: 'white',
                        zIndex: 1,
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                        },
                    }}
                >
                    <CloseIcon />
                </IconButton>

                {/* Main image container */}
                <Box sx={{
                    flex: 1,
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    p: 4,
                }}>
                    <IconButton
                        onClick={handlePrevious}
                        sx={{
                            position: 'absolute',
                            left: 16,
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <ChevronLeftIcon sx={{ fontSize: 50 }} />
                    </IconButton>

                    <Box
                        component="img"
                        src={images[currentIndex]}
                        alt={`View ${currentIndex + 1}`}
                        sx={{
                            maxWidth: '95%',
                            maxHeight: '95%',
                            objectFit: 'contain',
                            borderRadius: 2,
                        }}
                    />

                    <IconButton
                        onClick={handleNext}
                        sx={{
                            position: 'absolute',
                            right: 16,
                            color: 'white',
                            '&:hover': {
                                bgcolor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}
                    >
                        <ChevronRightIcon sx={{ fontSize: 50 }} />
                    </IconButton>
                </Box>

                {/* Thumbnails container */}
                <Box sx={{
                    height: '100px',
                    bgcolor: '#111315',
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    px: 4,
                    gap: 1,
                    overflowX: 'auto',
                    '&::-webkit-scrollbar': {
                        height: 6,
                    },
                    '&::-webkit-scrollbar-track': {
                        bgcolor: 'transparent',
                        borderRadius: 3,
                    },
                    '&::-webkit-scrollbar-thumb': {
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                        borderRadius: 3,
                        '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.5)',
                        },
                    },
                }}>
                    {images.map((image, index) => (
                        <Box
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            sx={{
                                width: '120px',
                                height: '80px',
                                flexShrink: 0,
                                borderRadius: 1,
                                overflow: 'hidden',
                                cursor: 'pointer',
                                border: currentIndex === index ? '2px solid #FF6B00' : '2px solid transparent',
                                opacity: currentIndex === index ? 1 : 0.6,
                                transition: 'all 0.2s ease',
                                '&:hover': {
                                    opacity: currentIndex === index ? 1 : 0.8,
                                },
                            }}
                        >
                            <Box
                                component="img"
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                sx={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                }}
                            />
                        </Box>
                    ))}
                </Box>
            </Box>
        </Modal>
    );
};
