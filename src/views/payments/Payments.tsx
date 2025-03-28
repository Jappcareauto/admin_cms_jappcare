import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Chip,
    Stack,
    styled,
    Grid,
    CardContent,
    Card,
} from '@mui/material';
import WalletIcon from '../../components/Icones/WalletIcon';
import UpwardArrowIcon from '../../components/Icones/UpwardArrowIcon';
import DownwardArrowIcon from '../../components/Icones/DownwardArrowIcon';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';

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

const Payments = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [activeMethodFilter, setActiveMethodFilter] = useState('All');
    const [loading, setLoading] = useState(false);
    const [payments, setPayments] = useState<Transaction[]>([]);
    // const [filteredPayments, setFilteredPayments] = useState<iPayments[]>([]);
    const [errorMessage, setErrorMessage] = useState('');
    // const navigate = useNavigate();
    console.log("errorMessage", errorMessage);
    console.log("loading", loading);
    console.log("payments", payments);


    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    // console.log("userconnected", connectedUsers);
    const token = connectedUsers.accessToken

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

    const fetchPayments = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `payment/list`, 'GET', "", token);
            console.log("fecthpaymentresp", response);
            if (response && response.body.meta.statusCode === 200) {
                // setSuccessMessage('Successful!');
                setPayments(response.body.data);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.meta.message || 'Unauthorized to perform action');
            } else {
                setErrorMessage('Error fetching payments');

            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }

        setLoading(false);
    };

    useEffect(() => {
        fetchPayments();
    }, []);


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
                                        890,000 Frs
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
                                        1,283,000 Frs
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

export default Payments;