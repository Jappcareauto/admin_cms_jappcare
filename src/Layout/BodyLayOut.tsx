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
                bgcolor: 'background.default',
                minHeight: 'calc(100vh - 64px - 100px)', // Accounting for header and footer
            }}
        >
            {children}
        </Box>
    );
};

export default BodyLayout;