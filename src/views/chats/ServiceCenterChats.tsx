import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    InputBase,
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    styled,
    CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';
import { Chatroom } from '../../interfaces/Interfaces';
import { ChatroomParticipant } from './types';
import { formatValue } from '../../tools/formatValue';

// Styled Components
const SearchInput = styled(InputBase)(() => ({
    backgroundColor: '#FFEDE6',
    borderRadius: 28,
    padding: '8px 12px',
    width: '100%',
    '& input': {
        padding: '4px 8px',
    }
}));

const ServiceItem = styled(ListItem)(() => ({
    borderRadius: 8,
    marginBottom: 8,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: '#FFEDE6',
    }
}));

const ServiceCenterChats = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [chatrooms, setChatrooms] = useState<Chatroom[]>([]); // Initialize as empty array
    const [searchTerm, setSearchTerm] = useState('');

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    const token = connectedUsers.accessToken;
    const userId = connectedUsers.id;

    console.log("userId", userId);


    const fetchChatrooms = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `chatroom/list`, 'GET', {}, token);
            console.log("fetchChatroomResponse", response);
            if (response && response.body.meta.statusCode === 200) {
                // Make sure data is an array before setting state
                const chatroomsData = response?.body.data;
                setChatrooms(chatroomsData || []); // Set to empty array if undefined or null

            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage(response.body.errors || 'Unauthorized to perform action');
                setChatrooms([]); // Reset to empty array
            } else {
                setErrorMessage('Error fetching chatrooms');
                setChatrooms([]); // Reset to empty array
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
            setChatrooms([]); // Reset to empty array
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchChatrooms();
    }, []);

    // Generate a random UUID function
    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    // Check if user is already a participant in the chatroom
    const checkUserInChatroom = async (chatRoomId: any) => {
        try {
            const response = await JC_Services('JAPPCARE', `chat-participant/chatroom/${chatRoomId}`, 'GET', {}, token);

            if (response && response.body.meta.statusCode === 200) {
                const participants = response.body.data || [];
                console.log("Participants in chatroom:", participants);

                return participants.some((participant: ChatroomParticipant) => participant.user.id === userId);
            }
            return false;
        } catch (error) {
            console.error("Error checking chatroom participants:", error);
            return false;
        }
    };

    const handleServiceCenterChats = async (chatroom: Chatroom) => {
        try {
            // First check if user is already in the chatroom
            const isUserInChatroom = await checkUserInChatroom(chatroom.id);

            if (isUserInChatroom) {
                // User is already in the chatroom, just navigate
                console.log("User already in chatroom. Navigating...");
                navigate(`/chats/${chatroom.id}`, { state: { chatsData: chatroom } });
                return;
            }

            // If user is not in the chatroom, add them first
            const payload = {
                id: generateUUID(),
                userId: userId,
                chatRoomId: chatroom.id,
                // userIdAsUuid: userId,
                // chatRoomIdAsUuid: chatroom.id,
                // idAsUuid: generateUUID()
            };

            // Call the API to add the user to the chat
            const response = await JC_Services('JAPPCARE', 'chat-participant/add', 'POST', payload, token);

            console.log("Add chat participant response:", response);

            // Check if the API call was successful
            if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201) {
                // If successful, navigate to the chat page
                navigate(`/chats/${chatroom.id}`, { state: { chatsData: chatroom } });
            } else {
                // If there was an error, show the error message
                const errorMsg = response?.body?.errors || 'Failed to join the chat room';
                setErrorMessage(errorMsg);
                console.error("Error adding user to chat:", errorMsg);
            }
        } catch (error) {
            console.error("Error handling service center chat:", error);
            setErrorMessage("Network Error Try Again Later!!!!");
        }
    };

    // Function to get initials from service center name
    const getInitials = (name: string): string => {
        if (!name) return 'SC'; // Default initials if name is empty

        // Split by spaces and get first letter of each word, maximum 2 letters
        const words = name.split(' ');
        if (words.length === 1) {
            return name.substring(0, 2).toUpperCase();
        }

        return (words[0][0] + words[1][0]).toUpperCase();
    };

    // Filter chatrooms based on search term
   const filteredChatrooms =
  chatrooms && Array.isArray(chatrooms)
    ? chatrooms.filter(chatroom => {
        const name = (chatroom.name ?? "Service Center").toLowerCase();
        return name.includes(searchTerm.toLowerCase());
      })
    : [];


        

    return (
        <Box sx={{ display: 'flex', height: '100vh' }}>
            {/* Left Sidebar */}
            <Box sx={{ width: 400, borderRight: '1px solid #F0F0F0', p: 2 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                    Service Center Chats
                </Typography>

                <Box sx={{ mb: 2 }}>
                    <SearchInput
                        placeholder="Search"
                        startAdornment={<SearchIcon sx={{ color: '#666', mr: 1 }} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                        <CircularProgress color="inherit" />
                    </Box>
                ) : errorMessage ? (
                    <Typography color="error" sx={{ mt: 2 }}>
                        {errorMessage}
                    </Typography>
                ) : (
                    <List sx={{ p: 0 }}>
                        {filteredChatrooms.length > 0 ? (
                            filteredChatrooms.map((chatroom) => (
                                <ServiceItem
                                    key={chatroom.id}
                                    onClick={() => handleServiceCenterChats(chatroom)}
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                bgcolor: '#1A1D1F',
                                                color: '#FF7A00',
                                                border: '2px solid #FF7A00',
                                                width: 48,
                                                height: 48,
                                                fontSize: 16,
                                                fontWeight: 600,
                                                boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)',
                                            }}
                                        >
                                            {getInitials(chatroom.name || '')}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={(chatroom.name) || 'Unnamed Service Center'}
                                        secondary={chatroom.updatedAt ? new Date(chatroom.updatedAt).toLocaleDateString() : 'No date'}
                                    />
                                </ServiceItem>
                            ))
                        ) : (
                            <Typography sx={{ mt: 2, textAlign: 'center' }}>
                                No chatrooms found
                            </Typography>
                        )}
                    </List>
                )}
            </Box>
        </Box>
    );
};

export default ServiceCenterChats;