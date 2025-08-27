import { useState, useRef, useEffect } from 'react';
import {
    Box,
    Typography,
    InputBase,
    Avatar,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    styled,
    Button,
    Chip,
    CircularProgress,
    AvatarGroup
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { ChatroomParticipant, Message } from './types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Chatroom } from '../../interfaces/Interfaces';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';

// Import STOMP dependencies
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
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

const StyledChip = styled(Chip)(() => ({
    borderRadius: 28,
    padding: '20px 14px',
    '&.active': {
        backgroundColor: "#FB7C37",
        color: 'white',
    },
}));

const Chats = () => {
    const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({});
    const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
    const stompClientRef = useRef<any>(null);
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    // STOMP WebSocket URL
    const WEBSOCKET_URL = 'https://bpi.jappcare.com/ws';

    // API state
    const [participants, setParticipants] = useState<ChatroomParticipant[]>([]);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorParticipantMessage, setErrorParticipantMessage] = useState('');
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [showAllParticipants, setShowAllParticipants] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [userId, setUserId] = useState('');
    const [chatroomDetails, setChatroomDetails] = useState<{
        id: string;
        name: string;
    } | null>(null);
    const [isConnected, setIsConnected] = useState(false);
    const [userParticipantId, setUserParticipantId] = useState('');

    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY = 3000; // 3 seconds

    const messagesMapRef = useRef<Map<string, Message>>(new Map());
    const [messageArray, setMessageArray] = useState<Message[]>([]);

    const connectedUsers: iUsersConnected = useSelector(
        (state: iUsersConnected) => state)

    const token = connectedUsers.accessToken;

    // Create a map of user IDs to names for displaying in messages
    const [userMap, setUserMap] = useState<{ [key: string]: { id: string, name: string, profileImage: string | null } }>({});

    // Function to safely update messages without duplication
    const updateMessages = (newMessage: Message) => {
        // Ensure the message has a proper ID
        const messageId = newMessage.id ||
            `${newMessage.senderId}-${(newMessage.timestamp instanceof Date ? newMessage.timestamp.getTime() : Date.now())}`;

        // Update our reference Map
        messagesMapRef.current.set(messageId, {
            ...newMessage,
            id: messageId
        });

        // Convert Map to Array and sort by timestamp
        const updatedMessages = Array.from(messagesMapRef.current.values())
            .sort((a, b) => {
                const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : 0;
                const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : 0;
                return timeA - timeB;
            });

        // Update state with new array
        setMessageArray(updatedMessages);

        // Schedule scroll to bottom
        setTimeout(scrollToBottom, 100);
    };

    // Clear messages when chatroom changes
    useEffect(() => {
        messagesMapRef.current.clear();
        setMessageArray([]);
    }, [id]); // Only reset when chatroom ID changes



    // Add this function to fetch historical messages
    const fetchChatroomMessages = async () => {
        if (!id || !token) return;

        setMessagesLoading(true);
        setErrorMessage('');

        try {
            // Fetch existing messages from API
            const response = await JC_Services('JAPPCARE', `chat/message/chatroom/${id}`, 'GET', '', token);
            console.log("fetchChatroomMessagesResponse", response);

            if (response && response.body.meta.statusCode === 200) {
                const messagesData = response?.body.data || [];

                // Clear existing messages first
                messagesMapRef.current.clear();

                // Process and add historical messages
                messagesData.forEach((messageData: any) => {
                    const messageId = messageData.id ||
                        `${messageData.senderId || messageData.senderIdAsUuid}-${messageData.timestamp || Date.now()}`;

                    const senderId = messageData.senderId || messageData.senderIdAsUuid;

                    const formattedMessage = {
                        id: messageId,
                        senderId: senderId,
                        senderName: userMap[senderId]?.name || messageData.sender || 'Unknown User',
                        content: messageData.content,
                        chatRoomId: messageData.chatRoomId || messageData.chatRoomIdAsUuid || id,
                        timestamp: messageData.timestamp ? new Date(messageData.timestamp) : new Date(),
                        type: messageData.type || 'TEXT_SIMPLE',
                        url: messageData.url,
                        duration: messageData.duration,
                    };

                    // Add to messages map
                    messagesMapRef.current.set(messageId, formattedMessage);
                });

                // Convert to array and sort by timestamp
                const sortedMessages = Array.from(messagesMapRef.current.values())
                    .sort((a, b) => {
                        const timeA = a.timestamp instanceof Date ? a.timestamp.getTime() : 0;
                        const timeB = b.timestamp instanceof Date ? b.timestamp.getTime() : 0;
                        return timeA - timeB;
                    });

                setMessageArray(sortedMessages);

                // Scroll to bottom after loading messages
                setTimeout(scrollToBottom, 100);

            } else if (response && response.body.meta.statusCode === 401) {
                setErrorMessage('Unauthorized to view messages');
            } else {
                setErrorMessage('Error fetching chatroom messages');
            }
        } catch (error) {
            console.error("Error fetching messages:", error);
            setErrorMessage("Network Error: Unable to load messages");
        }

        setMessagesLoading(false);
    };

    // Add this useEffect to fetch messages after participants are loaded
    useEffect(() => {
        // Only fetch messages after we have participants and user mapping
        if (id && token && Object.keys(userMap).length > 0) {
            fetchChatroomMessages();
        }
    }, [id, token, userMap]); // Depend on userMap so we fetch messages after user data is available

    // Modify the STOMP connection useEffect to depend on userMap
    useEffect(() => {
        // Only connect to WebSocket after we have basic data
        if (!id || !token || !userId || Object.keys(userMap).length === 0) return;

        let isComponentMounted = true;

        const connectStomp = () => {
            console.log('Attempting to connect STOMP WebSocket...');

            try {
                // Create SockJS connection
                const socket = new SockJS(WEBSOCKET_URL);
                const stompClient = Stomp.over(socket);

                // Disable debug logging (optional)
                stompClient.debug = () => { };

                stompClientRef.current = stompClient;

                // Connection established
                stompClient.connect(
                    {
                        // Add authentication headers if needed
                        Authorization: `Bearer ${token}`,
                    },
                    (frame: any) => {
                        if (!isComponentMounted) return;

                        console.log('STOMP WebSocket connected:', frame);
                        setIsConnected(true);
                        setReconnectAttempts(0);

                        // Subscribe to the chatroom topic for NEW messages only
                        const subscription = stompClient.subscribe(
                            `/topic/chatroom/${id}`,
                            (messageOutput) => {
                                if (!isComponentMounted) return;

                                try {
                                    const data = JSON.parse(messageOutput.body);
                                    console.log('New message received via STOMP:', data);

                                    // Skip if we don't have actual message content
                                    if (!data.content && data.type !== 'AUDIO' && data.type !== 'IMAGE') {
                                        console.log('Skipping message without content:', data);
                                        return;
                                    }
                                    console.log("subcription", subscription);

                                    // Create a unique message ID
                                    const messageId = data.id ||
                                        `${data.senderId || data.senderIdAsUuid}-${data.timestamp || Date.now()}`;

                                    // Check if we already have this message (prevent duplicates)
                                    if (messagesMapRef.current.has(messageId)) {
                                        console.log('Skipping duplicate message with ID:', messageId);
                                        return;
                                    }

                                    const senderId = data.senderId || data.senderIdAsUuid;

                                    const formattedMessage = {
                                        id: messageId,
                                        senderId: senderId,
                                        senderName: userMap[senderId]?.name || data.sender || 'Unknown User',
                                        content: data.content,
                                        chatRoomId: data.chatRoomId || data.chatRoomIdAsUuid || id,
                                        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
                                        type: data.type || 'TEXT_SIMPLE',
                                        url: data.url,
                                        duration: data.duration,
                                    };

                                    console.log('Processing new real-time message:', formattedMessage);
                                    updateMessages(formattedMessage);
                                } catch (error) {
                                    console.error('Error parsing STOMP message:', error);
                                }
                            }
                        );

                        console.log(`Subscribed to chatroom topic: /topic/chatroom/${id}`);
                    },
                    (error: any) => {
                        if (!isComponentMounted) return;

                        console.error('STOMP connection error:', error);
                        setErrorMessage('Failed to connect to chat server. Please try again later.');
                        setIsConnected(false);

                        // Attempt to reconnect
                        handleReconnect();
                    }
                );

            } catch (error) {
                console.error('Error creating STOMP connection:', error);
                setErrorMessage('Failed to initialize chat connection.');
                setIsConnected(false);
            }
        };

        const handleReconnect = () => {
            if (!isComponentMounted) return;

            if (reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
                console.log(`Attempting to reconnect in ${RECONNECT_DELAY / 1000} seconds... (Attempt ${reconnectAttempts + 1}/${MAX_RECONNECT_ATTEMPTS})`);

                // Clear any existing timeout
                if (reconnectTimeoutRef.current) {
                    clearTimeout(reconnectTimeoutRef.current);
                }

                // Set a new reconnect timeout
                reconnectTimeoutRef.current = setTimeout(() => {
                    if (isComponentMounted) {
                        setReconnectAttempts(prev => prev + 1);
                        connectStomp();
                    }
                }, RECONNECT_DELAY);
            } else {
                console.log('Maximum reconnection attempts reached. Please refresh the page.');
                setErrorMessage('Connection lost. Maximum reconnection attempts reached. Please refresh the page.');
            }
        };

        // Initial connection - only after we have user data
        connectStomp();

        // Cleanup on component unmount
        return () => {
            isComponentMounted = false;

            if (stompClientRef.current && stompClientRef.current.connected) {
                console.log('Disconnecting STOMP client');
                stompClientRef.current.disconnect(() => {
                    console.log('STOMP client disconnected');
                });
            }

            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [id, token, userId, userMap, reconnectAttempts]); // Now depends on userMap

    // Fetch participants from API
    const fetchChatroomParticipants = async () => {
        setLoading(true);
        try {
            const response = await JC_Services('JAPPCARE', `chat-participant/chatroom/${id}`, 'GET', '', token);
            console.log("fetchChatroomParticipantsResponse", response);

            if (response && response.body.meta.statusCode === 200) {
                const participantsData = response?.body.data;
                setParticipants(participantsData || []);

                // Get current user ID from Redux store
                const currentUser = connectedUsers.id;
                setUserId(currentUser || '');

                // Find the participant ID for the current user
                const currentUserParticipant = participantsData.find(
                    (participant: ChatroomParticipant) => participant.user.id === currentUser
                );
                if (currentUserParticipant) {
                    setUserParticipantId(currentUserParticipant.id);
                    console.log("Set user participant ID:", currentUserParticipant.id);
                }

                // Set chatroom details if available
                if (participantsData?.length > 0) {
                    setChatroomDetails({
                        id: participantsData[0].user.id,
                        name: participantsData[0].user.name
                    });
                }

                // Create user map for display names
                const userNames: { [key: string]: { id: string, name: string, profileImage: string | null } } = {};
                participantsData.forEach((participant: ChatroomParticipant) => {
                    userNames[participant.id] = {
                        id: participant.id,
                        name: participant.user.name,
                        profileImage: participant.user.profileImageUrl
                    };
                });
                setUserMap(userNames);
            } else if (response && response.body.meta.statusCode === 401) {
                setErrorParticipantMessage(response.body.errors || 'Unauthorized to perform action');
                setParticipants([]);
            } else {
                setErrorParticipantMessage('Error fetching chatroom participants');
                setParticipants([]);
            }
        } catch (error) {
            console.error("Error:", error);
            setErrorParticipantMessage("Network Error Try Again Later!!!!");
            setParticipants([]);
        }
        setLoading(false);
    };

    useEffect(() => {
        // Fetch participants when component mounts
        if (id) {
            fetchChatroomParticipants();
        }
    }, [id, token]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const toggleAudioPlay = async (messageId: string, audioUrl: string) => {
        let audio = audioElementsRef.current[messageId];

        if (!audio) {
            audio = new Audio(audioUrl);
            audioElementsRef.current[messageId] = audio;

            audio.addEventListener('timeupdate', () => {
                setAudioProgress({
                    ...audioProgress,
                    [messageId]: (audio.currentTime / audio.duration) * 100
                });
            });

            audio.addEventListener('ended', () => {
                setIsPlaying({ ...isPlaying, [messageId]: false });
                setAudioProgress({ ...audioProgress, [messageId]: 0 });
            });
        }

        if (isPlaying[messageId]) {
            audio.pause();
            setIsPlaying({ ...isPlaying, [messageId]: false });
        } else {
            // Stop other playing audios
            Object.entries(audioElementsRef.current).forEach(([id, audioElement]) => {
                if (id !== messageId) {
                    audioElement.pause();
                    setIsPlaying((prev) => ({ ...prev, [id]: false }));
                }
            });

            await audio.play();
            setIsPlaying({ ...isPlaying, [messageId]: true });
        }
    };

    const renderAudioMessage = (message: Message) => {
        if (message.type !== 'AUDIO' && message.type !== 'audio') return null;

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 250 }}>
                <IconButton
                    onClick={() => toggleAudioPlay(message.id!, message.url!)}
                    size="small"
                >
                    {isPlaying[message.id!] ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
                <Box sx={{ flex: 1, position: 'relative' }}>
                    <Box
                        sx={{
                            width: '100%',
                            height: 2,
                            bgcolor: '#FFE5D9',
                            borderRadius: 1
                        }}
                    />
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: 2,
                            bgcolor: '#FF7A00',
                            borderRadius: 1,
                            width: `${audioProgress[message.id!] || 0}%`,
                            transition: 'width 0.1s linear'
                        }}
                    />
                </Box>
                <Typography variant="caption">
                    {isPlaying[message.id!]
                        ? formatTime(Math.floor((audioProgress[message.id!] || 0) * (message.duration || 0) / 100))
                        : formatTime(message.duration || 0)
                    }
                </Typography>
            </Box>
        );
    };

    const [initialValues, setInitialValues] = useState<Chatroom>();
    const [activeStatus, setActiveStatus] = useState('All');

    useEffect(() => {
        if (id && location.state && location.state.chatsData) {
            // Use the data passed from the previous component
            setInitialValues(location.state.chatsData);
        }
    }, [id, location.state]);

    // Filter participants based on search term
    const filteredParticipants = participants.filter(
        participant => participant.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Display logic for participants (first 7 or all)
    const displayedParticipants = showAllParticipants
        ? filteredParticipants
        : filteredParticipants.slice(0, 7);

    const hasMoreParticipants = filteredParticipants.length > 7;

    // Connection status indicator component
    const ConnectionStatus = () => (
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
            <Box
                sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: isConnected ? '#4CAF50' : reconnectAttempts > 0 ? '#FFC107' : '#FF5722',
                    mr: 1
                }}
            />
            <Typography variant="caption" color={isConnected ? 'success.main' : reconnectAttempts > 0 ? 'warning.main' : 'error'}>
                {isConnected ? 'Connected' : reconnectAttempts > 0
                    ? `Reconnecting (${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})`
                    : 'Disconnected'}
            </Typography>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Left Sidebar - Participants List */}
            <Box sx={{
                width: 400, borderRight: '1px solid #F0F0F0', p: 1, overflowY: 'auto', height: '100vh'
            }}>
                <Box sx={{ p: 0 }}>
                    {/* Header with Back Button */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0,
                        ml: -2,
                        mb: 1
                    }}>
                        <IconButton
                            onClick={() => navigate(-1)}
                            sx={{
                                color: '#111111',
                                '&:hover': {
                                    bgcolor: '#FFEDE6'
                                }
                            }}
                        >
                            <ArrowBack />
                        </IconButton>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                            Chat Rooms
                        </Typography>
                    </Box>
                </Box>

                {/* Group Image/Avatar */}
                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        bgcolor: '#111111',
                        color: '#FF7A00',
                        fontSize: '22px',
                        fontWeight: 600,
                        border: '2px solid #FF7A00',
                        boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                    }}
                >
                    {initialValues?.name?.charAt(0) || chatroomDetails?.name?.charAt(0) || 'GC'}
                </Avatar>

                {/* Group Info */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <Typography sx={{
                            fontSize: '20px',
                            fontWeight: 600,
                            color: '#1A1D1F'
                        }}>
                            {formatValue(initialValues?.name) || formatValue(chatroomDetails?.name) || 'Group Chat'}
                        </Typography>
                        <Typography sx={{
                            fontSize: '14px',
                            color: '#6F767E'
                        }}>
                            {participants.length} participants
                        </Typography>
                    </Box>
                </Box>

                {/* Status Filters */}
                <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
                    {['All', 'Unread'].map((status) => (
                        <StyledChip
                            key={status}
                            label={status}
                            className={activeStatus === status ? 'active' : ''}
                            onClick={() => setActiveStatus(status)}
                            sx={{
                                bgcolor: activeStatus === status ? '#FB7C37' : '#fff',
                                '&:hover': {
                                    bgcolor: activeStatus === status ? '#FB7C37' : 'rgba(0, 0, 0, 0.04)',
                                },
                            }}
                        />
                    ))}
                </Box>

                {/* Participants Search */}
                <Box sx={{ mb: 2 }}>
                    <SearchInput
                        placeholder="Search participants"
                        startAdornment={<SearchIcon sx={{ color: '#666', mr: 1 }} />}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Box>

                {/* Participants List Header */}
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    Participants
                </Typography>

                {/* Display loading state */}
                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress sx={{ color: '#FF7A00' }} />
                    </Box>
                ) : errorParticipantMessage ? (
                    <Box sx={{ textAlign: 'center', p: 2, color: 'error.main' }}>
                        <Typography>{errorParticipantMessage}</Typography>
                    </Box>
                ) : (
                    <>
                        <List sx={{ p: 0 }}>
                            {displayedParticipants.map((participant) => (
                                <ServiceItem
                                    key={participant.id}
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
                                                boxShadow: 'inset 0 0 0 2px rgb(247, 249, 250)',
                                            }}
                                            src={participant.user.profileImageUrl || ""}
                                        >
                                            {participant.user.name?.charAt(0).toUpperCase()}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={participant.user.name}
                                        secondary={participant.user.id === userId ? "(You)" : ""}
                                    />
                                </ServiceItem>
                            ))}
                        </List>

                        {/* Show more button if there are more than 7 participants */}
                        {hasMoreParticipants && (
                            <Box sx={{ textAlign: 'center', mt: 1, mb: 2 }}>
                                <Button
                                    startIcon={showAllParticipants ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    onClick={() => setShowAllParticipants(!showAllParticipants)}
                                    sx={{
                                        color: '#FF7A00',
                                        '&:hover': {
                                            bgcolor: '#FFEDE6'
                                        }
                                    }}
                                >
                                    {showAllParticipants ? 'Show Less' : 'Show More'}
                                </Button>
                            </Box>
                        )}
                    </>
                )}
            </Box>

            {/* Main Chat Area */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh' }}>
                {/* Chat Header */}
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 2,
                    borderBottom: '1px solid #F0F0F0'
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 36, height: 36 } }}>
                            {participants.slice(0, 3).map((participant) => (
                                <Avatar
                                    key={participant.id}
                                    src={participant.user.profileImageUrl || ""}
                                    sx={{
                                        bgcolor: '#1A1D1F',
                                        color: '#FF7A00',
                                        borderColor: '#fff'
                                    }}
                                >
                                    {participant.user.name?.charAt(0).toUpperCase()}
                                </Avatar>
                            ))}
                        </AvatarGroup>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, ml: 1 }}>
                            {formatValue(initialValues?.name) || formatValue(chatroomDetails?.name) || 'Chat Room'}
                        </Typography>
                        <ConnectionStatus />
                    </Box>
                </Box>

                {/* Messages Area */}
                <Box sx={{ flex: 1, p: 2, overflowY: 'auto', bgcolor: '#F9FAFB' }}>
                    {messagesLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <CircularProgress sx={{ color: '#FF7A00' }} />
                        </Box>
                    ) : errorMessage ? (
                        <Box sx={{ textAlign: 'center', p: 2, color: 'error.main' }}>
                            <Typography>{errorMessage}</Typography>
                            <Button
                                variant="outlined"
                                sx={{ mt: 2, color: '#FF7A00', borderColor: '#FF7A00' }}
                                onClick={() => window.location.reload()}
                            >
                                Retry
                            </Button>
                        </Box>
                    ) : messageArray.length === 0 ? (
                        <Box sx={{ textAlign: 'center', p: 4, color: '#6F767E' }}>
                            <Typography>No messages yet. Waiting for new messages...</Typography>
                        </Box>
                    ) : (
                        messageArray.map((message) => {
                            const isCurrentUser = (message.senderId === userParticipantId);

                            return (
                                <Box
                                    key={message.id}
                                    sx={{
                                        display: 'flex',
                                        justifyContent: isCurrentUser ? 'flex-end' : 'flex-start',
                                        mb: 2
                                    }}
                                >
                                    {!isCurrentUser && (
                                        <Avatar
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                mr: 1,
                                                bgcolor: '#1A1D1F',
                                                color: '#FF7A00',
                                                fontSize: 14
                                            }}
                                            src={userMap[message.senderId]?.profileImage || ""}
                                        >
                                            {message.senderName?.charAt(0).toUpperCase()}
                                        </Avatar>
                                    )}
                                    <Box sx={{ maxWidth: '70%' }}>
                                        {!isCurrentUser && (
                                            <Typography variant="caption" sx={{ color: '#6F767E', ml: 1 }}>
                                                {message.senderName}
                                            </Typography>
                                        )}
                                        <Paper
                                            elevation={0}
                                            sx={{
                                                p: 2,
                                                bgcolor: isCurrentUser ? '#FF7A00' : '#FFFFFF',
                                                color: isCurrentUser ? '#FFFFFF' : '#1A1D1F',
                                                borderRadius: isCurrentUser ? '16px 0px 16px 16px' : '0px 16px 16px 16px',
                                                wordBreak: 'break-word'
                                            }}
                                        >
                                            {(message.type === 'TEXT_SIMPLE' || message.type === 'TEXT') && (
                                                <Typography>{message.content}</Typography>
                                            )}
                                            {message.type === 'IMAGE' && (
                                                <Box
                                                    component="img"
                                                    src={message.url}
                                                    alt={message.content}
                                                    sx={{ maxWidth: '100%', borderRadius: 1 }}
                                                />
                                            )}
                                            {(message.type === 'audio' || message.type === 'AUDIO') && renderAudioMessage(message)}
                                        </Paper>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                color: '#6F767E',
                                                display: 'block',
                                                textAlign: isCurrentUser ? 'right' : 'left',
                                                mt: 0.5,
                                                mr: isCurrentUser ? 1 : 0,
                                                ml: isCurrentUser ? 0 : 1
                                            }}
                                        >
                                            {new Date(message.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </Typography>
                                    </Box>
                                </Box>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Message Input Area */}
                <Box sx={{
                    p: 2,
                    borderTop: '1px solid #F0F0F0',
                    bgcolor: '#FFFFFF'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        p: 1,
                        bgcolor: '#F9FAFB',
                        borderRadius: 2,
                        border: '1px solid #E5E7EB'
                    }}>
                        <InputBase
                            placeholder="Type a message..."
                            sx={{
                                flex: 1,
                                px: 2,
                                '& input': {
                                    padding: '8px 0',
                                }
                            }}
                            multiline
                            maxRows={4}
                        />
                        <IconButton
                            sx={{
                                bgcolor: '#FF7A00',
                                color: '#FFFFFF',
                                '&:hover': {
                                    bgcolor: '#E65100'
                                },
                                '&:disabled': {
                                    bgcolor: '#E0E0E0',
                                    color: '#9E9E9E'
                                }
                            }}
                        >
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Chats;