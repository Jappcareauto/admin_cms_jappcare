import { Box, Container, Typography } from '@mui/material';

const FooterLayout = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                bgcolor: 'background.paper',
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Typography variant="body2" color="text.secondary" align="center">
                    © 2024 JAPP-CARE. All rights reserved.
                </Typography>
            </Container>
        </Box>
    );
};

export default FooterLayout;