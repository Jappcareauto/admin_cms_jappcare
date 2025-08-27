;
import { Box } from '@mui/material';

interface BodyLayoutProps {
    children: React.ReactNode;
}

const BodyLayout = ({ children }: BodyLayoutProps) => {
    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                minHeight: 'calc(100vh - 64px - 100px)', // Accounting for header and footer
                bgcolor: 'rgba(248, 201, 187, 0.1)',
                overflowX: 'hidden'  // Add this to prevent horizontal scrolling
            }}
        >
            {children}
        </Box>
    );
};

export default BodyLayout;