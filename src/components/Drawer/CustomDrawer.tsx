;
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

interface CustomDrawerProps {
    open: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const CustomDrawer = ({ open, onClose, title, children }: CustomDrawerProps) => {
    return (
        <Box sx={{
            bgcolor: '#FFF5F5'
        }}>
            <Drawer
                anchor="right"
                open={open}
                onClose={onClose}
                // ModalProps={{
                //     BackdropProps: {
                //         style: { display: 'none' }, // Disables the backdrop
                //     },
                // }}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: {
                            xs: '100%',
                            sm: '450px'
                        },
                        bgcolor: '#FFF5F5',
                        background: 'background.paper',
                        padding: '24px',

                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 3
                }}>
                    <Typography variant="h6" component="h2">
                        {title}
                    </Typography>
                    <IconButton onClick={onClose} edge="end">
                        <CloseIcon />
                    </IconButton>
                </Box>
                {children}
            </Drawer>
        </Box>

    );
};

export default CustomDrawer;