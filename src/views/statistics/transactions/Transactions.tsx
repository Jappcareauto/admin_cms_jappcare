import { useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Stack,
    styled,
    Grid,
    CardContent,
    Card,
    IconButton
} from '@mui/material';
import WalletIcon from '../../../components/Icones/WalletIcon';
import UpwardArrowIcon from '../../../components/Icones/UpwardArrowIcon';
import DownwardArrowIcon from '../../../components/Icones/DownwardArrowIcon';
import { Close } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Interfaces
interface Transaction {
    amount: string;
    date: string;
    method: 'Cash' | 'MTN Momo';
    from?: string;
    to: string;
    type: 'Withdrawal' | 'Earnings';
}

interface StyledCardProps {
    bgcolor?: string;
}

// Styled Components
const StyledChip = styled(Chip)(({ }) => ({
    borderRadius: 28,
    // width: 99,
    height: 38,
    padding: '20px 14px',
    '&.active': {
        backgroundColor: '#FF7A00',
        color: 'white',
    },
}));

const TransactionItem = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '16px 0',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
}));

const TransactionStatus = styled(Box)(({ type }: { type: 'Withdrawal' | 'Earnings' }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 10px',
    borderRadius: '16px',
    backgroundColor: type === 'Withdrawal' ? '#FFEDE9' : '#C4FFCD',
    color: type === 'Withdrawal' ? '#F1351B' : '#006D35',
    fontWeight: 600,
    height: 30,
}));

const CircleAvatar = styled(Box)(() => ({
    width: 36,
    height: 36,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    bgcolor: '#1A1D1F',
    fontWeight: 600,
    border: '2px solid #FF7A00',
    boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
}));

const StyledCard = styled(Card)<StyledCardProps>(({ theme, bgcolor }) => ({
    height: '100%',
    backgroundColor: bgcolor || theme.palette.background.paper,
    borderRadius: 16,
    boxShadow: 'none',
    border: '1px solid rgba(0, 0, 0, 0.05)',
}));

const TransactionsView = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const navigate = useNavigate();
    // Sample data
    const transactions: Transaction[] = [
        {
            amount: '28,000 Frs',
            date: 'Oct. 20, 2024',
            method: 'Cash',
            to: "Dave's Garage",
            type: 'Withdrawal'
        },
        {
            amount: '28,000 Frs',
            date: 'Oct. 20, 2024',
            method: 'MTN Momo',
            from: 'Sara Maye',
            to: "Dave's Garage",
            type: 'Earnings'
        },
        {
            amount: '15,500 Frs',
            date: 'Oct. 19, 2024',
            method: 'MTN Momo',
            from: 'John Smith',
            to: "Mike's Auto Shop",
            type: 'Earnings'
        },
        {
            amount: '42,000 Frs',
            date: 'Oct. 18, 2024',
            method: 'Cash',
            to: "Elena's Motors",
            type: 'Withdrawal'
        },
        {
            amount: '33,750 Frs',
            date: 'Oct. 18, 2024',
            method: 'MTN Momo',
            from: 'Robert Chen',
            to: "Quick Fix Garage",
            type: 'Earnings'
        },
        {
            amount: '19,900 Frs',
            date: 'Oct. 17, 2024',
            method: 'Cash',
            from: 'Maria Garcia',
            to: "Pro Auto Care",
            type: 'Earnings'
        },
        {
            amount: '55,000 Frs',
            date: 'Oct. 16, 2024',
            method: 'MTN Momo',
            to: "Alex's Workshop",
            type: 'Withdrawal'
        }
    ];


    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>

                <Box></Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                        <WalletIcon fill='#111111' />
                        <Typography variant="h6" fontWeight={600}>
                            Transactions
                        </Typography>
                    </Box>
                    <IconButton onClick={() => { navigate(-1) }}>
                        <Close />
                    </IconButton>

                </Box>

                <Grid container spacing={3} >
                    <Grid item xs={12} md={4} >
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                    <WalletIcon fill='#FB7C37' />
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
            </Box>

            {/* Filters */}
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {['All', 'Earnings', 'Withdrawals'].map((filter) => (
                    <StyledChip
                        key={filter}
                        label={filter}
                        className={activeFilter === filter ? 'active' : ''}
                        onClick={() => setActiveFilter(filter)}
                        sx={{
                            bgcolor: activeFilter === filter ? '#FF7A00' : '#FFEDE6',
                            color: activeFilter === filter ? '#fff' : '#000',
                        }}
                    />
                ))}
            </Stack>

            {/* Transactions List */}
            <Typography variant="h6" sx={{ mb: 2, color: '#111' }}>
                Transactions
            </Typography>
            {transactions.map((transaction, index) => (
                <TransactionItem key={index}>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={500}>
                            {transaction.amount}
                        </Typography>

                    </Box>
                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {transaction.date}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            {transaction.method}
                        </Typography>
                    </Box>

                    <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        {transaction.from && (
                            <>
                                <CircleAvatar sx={{ bgcolor: '#000', color: '#FF7A00', }}>
                                    {transaction.from.split(' ').map(n => n[0]).join('')}
                                </CircleAvatar>
                                <Box>
                                    <Typography variant="body2" color="text.secondary">
                                        From
                                    </Typography>
                                    <Typography variant="body2">
                                        {transaction.from}
                                    </Typography>
                                </Box>
                            </>
                        )}
                    </Box>

                    <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CircleAvatar sx={{ bgcolor: '#FF7A00', color: '#fff' }}>
                            {transaction.to.split(' ').map(n => n[0]).join('')}
                        </CircleAvatar>
                        <Box>
                            <Typography variant="body2" color="text.secondary">
                                To
                            </Typography>
                            <Typography variant="body2">
                                {transaction.to}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                        <TransactionStatus type={transaction.type}>
                            {transaction.type}

                        </TransactionStatus>
                        <Box>
                            {transaction.type === 'Withdrawal' ? (
                                <UpwardArrowIcon />
                            ) : (
                                <DownwardArrowIcon />
                            )}
                        </Box>

                    </Box>
                </TransactionItem>
            ))}
        </Box>
    );
};

export default TransactionsView;