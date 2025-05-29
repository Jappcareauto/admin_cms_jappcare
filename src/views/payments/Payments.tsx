import { useEffect, useState } from 'react';
import { format, parseISO } from 'date-fns';
import {
    Box,
    Typography,
    Chip,
    Stack,
    styled,
    Grid,
    CardContent,
    Card,
    CircularProgress
} from '@mui/material';
import WalletIcon from '../../components/Icones/WalletIcon';
import UpwardArrowIcon from '../../components/Icones/UpwardArrowIcon';
import DownwardArrowIcon from '../../components/Icones/DownwardArrowIcon';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';

// Interfaces
interface Transaction {
    id: string;
    money: {
        amount: number;
        currency: string;
    };
    paymentDate: string;
    paymentMethod: string;
    paymentMethodName: string;
    userFrom: string;
    userTo: string;
    amount: string;
}

interface StyledCardProps {
    bgcolor?: string;
}

// Styled Components
const StyledChip = styled(Chip)(({ }) => ({
    borderRadius: 28,
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

const Payments = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeMethodFilter, setActiveMethodFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState<Transaction[]>([]);
    const [errorMessage, setErrorMessage] = useState('');

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    const token = connectedUsers.accessToken

    const fetchPayments = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            console.log("Fetching payments with token:", token);

            const response = await JC_Services('JAPPCARE', `payment/list`, 'POST', {}, token);

            console.log("Full API Response:", JSON.stringify(response, null, 2));

            // Detailed logging of response structure
            if (response) {
                console.log("Response Body:", response.body);
                console.log("Meta Status Code:", response.body?.meta?.statusCode);
            }

            if (response && response.body?.meta?.statusCode === 200) {
                // Ensure data is an array
                const paymentData = Array.isArray(response.body.data)
                    ? response.body.data
                    : [];

                console.log("Processed Payment Data:", paymentData);
                setPayments(paymentData);
            } else {
                // More specific error handling
                const errorMsg = response?.body?.meta?.message
                    || 'Failed to fetch payments'
                    || 'Unknown error occurred';

                setErrorMessage(errorMsg);
                console.error("Payment Fetch Error:", errorMsg);
            }
        } catch (error) {
            console.error("Catch Block Error:", error);
            setErrorMessage(error instanceof Error ? error.message : "Network Error. Try Again Later!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPayments();
    }, []);

    // Calculations with extensive error handling
    const totalEarnings = payments
        .filter(p => p.userFrom !== 'Manager')
        .reduce((sum, payment) => sum + (payment.money?.amount || 0), 0);

    const totalWithdrawals = payments
        .filter(p => p.userTo === 'User')
        .reduce((sum, payment) => sum + (payment.money?.amount || 0), 0);

    // Filtering with error handling
    const filteredTransactions = payments.filter(transaction => {
        const typeMatch =
            activeFilter === 'All' ||
            (activeFilter === 'Withdrawals' && transaction.userFrom !== 'User') ||
            (activeFilter === 'Earnings' && transaction.userTo === 'Manager');

        const methodMatch =
            activeMethodFilter === 'All' ||
            transaction.paymentMethodName.replace(' ', '') === activeMethodFilter;

        return typeMatch && methodMatch;
    });

    // Render loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Render error state
    if (errorMessage) {
        return (
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography color="error" variant="h6">
                    {errorMessage}
                </Typography>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Please try again or contact support.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Header */}
            <Box sx={{ mb: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3, justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, }}>
                        <WalletIcon fill='#111111' />
                        <Typography variant="h6" fontWeight={600}>
                            Transactions
                        </Typography>
                    </Box>
                </Box>

                <Grid container spacing={3} >
                    <Grid item xs={12} md={3.5} >
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                    <WalletIcon fill='#FB7C37' />
                                </Box>
                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                        {totalWithdrawals.toLocaleString()} Frs
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Withdrawals
                                        </Typography>
                                        <UpwardArrowIcon />
                                    </Box>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                    <Grid item xs={12} md={3.5} >
                        <StyledCard>
                            <CardContent>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                    <WalletIcon fill='#FB7C37' />
                                </Box>
                                <Box sx={{ mt: 4 }}>
                                    <Typography variant="h4" color="#000000" sx={{ fontWeight: 'bold' }}>
                                        {totalEarnings.toLocaleString()} Frs
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'space-between' }}>
                                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                            Earnings
                                        </Typography>
                                        <DownwardArrowIcon />
                                    </Box>
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
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                {['All', 'Cash', 'MTNMomo', 'Card', 'Orange Money'].map((filter) => (
                    <StyledChip
                        key={filter}
                        label={filter}
                        className={activeMethodFilter === filter ? 'active' : ''}
                        onClick={() => setActiveMethodFilter(filter)}
                        sx={{
                            bgcolor: activeMethodFilter === filter ? '#FF7A00' : '#FFEDE6',
                            color: activeMethodFilter === filter ? '#fff' : '#000',
                        }}
                    />
                ))}
            </Stack>

            {/* Transactions List */}
            <Typography variant="h6" sx={{ mb: 2, color: '#111' }}>
                Transactions
            </Typography>
            {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                    <TransactionItem key={transaction.id}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={500}>
                                {transaction.amount}
                            </Typography>
                        </Box>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {format(parseISO(transaction.paymentDate), 'MMM. dd, yyyy')}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                                {transaction.paymentMethodName}
                            </Typography>
                        </Box>

                        <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            {transaction.userFrom !== 'User' && (
                                <>
                                    <CircleAvatar sx={{ bgcolor: '#000', color: '#FF7A00', }}>
                                        {transaction.userFrom.split(' ').map(n => n[0]).join('')}
                                    </CircleAvatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            From
                                        </Typography>
                                        <Typography variant="body2">
                                            {transaction.userFrom}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Box>


                        <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            {transaction.userFrom && (
                                <>
                                    <CircleAvatar sx={{ bgcolor: '#000', color: '#FF7A00', }}>
                                        {transaction.userFrom.split(' ').map(n => n[0]).join('')}
                                    </CircleAvatar>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">
                                            From
                                        </Typography>
                                        <Typography variant="body2">
                                            {transaction.userFrom}
                                        </Typography>
                                    </Box>
                                </>
                            )}
                        </Box>

                        <Box sx={{ flex: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircleAvatar sx={{ bgcolor: '#FF7A00', color: '#fff' }}>
                                {transaction.userTo.split(' ').map(n => n[0]).join('')}
                            </CircleAvatar>
                            <Box>
                                <Typography variant="body2" color="text.secondary">
                                    To
                                </Typography>
                                <Typography variant="body2">
                                    {transaction.userTo}
                                </Typography>
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 2 }}>
                            <TransactionStatus type={transaction.userTo === 'Manager' ? 'Earnings' : 'Withdrawal'}>
                                {transaction.userTo === 'Manager' ? 'Earnings' : 'Withdrawal'}
                            </TransactionStatus>
                            <Box>
                                {transaction.userTo === 'Manager' ? (
                                    <DownwardArrowIcon />

                                ) : (
                                    <UpwardArrowIcon />
                                )}
                            </Box>
                        </Box>
                    </TransactionItem>
                ))
            ) : (
                <Typography variant="body1" sx={{ textAlign: 'center', color: 'text.secondary', mt: 4 }}>
                    No transactions found
                </Typography>
            )}
        </Box>
    );
};

export default Payments;