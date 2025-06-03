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
    Popover,
    Button,
    Chip,
    CircularProgress,
    AvatarGroup
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
// import AttachFileIcon from '@mui/icons-material/AttachFile';
// import SendIcon from '@mui/icons-material/Send';
// import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
// import MicIcon from '@mui/icons-material/Mic';
// import StopIcon from '@mui/icons-material/Stop';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { ChatroomParticipant, Message } from './types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { Chatroom } from '../../interfaces/Interfaces';
import { JC_Services } from '../../services';
import { iUsersConnected } from '../../interfaces/UsersInterface';
import { useSelector } from 'react-redux';

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

// const MessageInput = styled(InputBase)(() => ({
//     backgroundColor: '#FFEDE6',
//     borderRadius: 28,
//     padding: '8px 16px',
//     width: '100%',
//     '& input': {
//         padding: '8px',
//     }
// }));

const StyledChip = styled(Chip)(() => ({
    borderRadius: 28,
    padding: '20px 14px',
    '&.active': {
        backgroundColor: "#FB7C37",
        color: 'white',
    },
}));

const Chats = () => {
    // const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    // const [isRecording, setIsRecording] = useState(false);
    // const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
    // const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    // const audioChunksRef = useRef<Blob[]>([]);
    // const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    // const [recordingTime, setRecordingTime] = useState(0);
    const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({});
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    // const recordingTimerRef = useRef<TimerRef>();
    const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
    const socketRef = useRef<WebSocket | null>(null);
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    console.log("messageInput", messageInput);


    // WebSocket URL
    const WEBSOCKET_URL = `wss://bpi.jappcare.com/chat?chatRoomId=${id}`;

    // New state for API data
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

    const pingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const [reconnectAttempts, setReconnectAttempts] = useState(0);
    const MAX_RECONNECT_ATTEMPTS = 5;
    const RECONNECT_DELAY = 3000; // 3 seconds
    const PING_INTERVAL = 30000; // 30 seconds

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

    // Initialize WebSocket connection
    useEffect(() => {
        if (!id || !token || !userId) return;
        let isComponentMounted = true;

        const connectWebSocket = () => {
            console.log('Attempting to connect WebSocket...');
            setMessagesLoading(true);
            // Connect to the WebSocket server with authentication
            const ws = new WebSocket(WEBSOCKET_URL);
            socketRef.current = ws;

            // Connection established
            ws.onopen = () => {
                console.log('WebSocket connected');
                setIsConnected(true);
                setReconnectAttempts(0); // Reset attempts on success

                // Send authentication message after connection
                const authMessage = {
                    type: 'AUTH',
                    token: token,
                    userId: userId,
                    chatroomId: id
                };
                ws.send(JSON.stringify(authMessage));

                // Join the chatroom
                const joinMessage = {
                    type: 'JOIN',
                    chatroomId: id,
                    userId: userId
                };
                ws.send(JSON.stringify(joinMessage));

                // Start the ping interval
                startPingInterval();
            };

            // New message received
            ws.onmessage = (event) => {
                if (!isComponentMounted) return;
                setMessagesLoading(false);
                try {
                    const data = JSON.parse(event.data);
                    console.log('New message received:', data);

                    // Handle pong response from server
                    if (data.type === 'PONG') {
                        console.log('Received PONG from server');
                        return;
                    }

                    // Skip if we don't have actual message content
                    if (!data.content && data.type !== 'AUDIO' && data.type !== 'IMAGE') {
                        console.log('Skipping message without content:', data);
                        return;
                    }

                    // Create a unique message ID
                    const messageId = data.id ||
                        `${data.senderId || data.senderIdAsUuid}-${data.timestamp || Date.now()}`;

                    // Check if we already have this message
                    if (messagesMapRef.current.has(messageId)) {
                        console.log('Skipping duplicate message with ID:', messageId);
                        return;
                    }

                    const senderId = data.senderId || data.senderIdAsUuid;

                    const formattedMessage = {
                        id: messageId,
                        senderId: senderId,
                        senderName: userMap[senderId]?.name || 'Unknown User',
                        content: data.content,
                        chatRoomId: data.chatRoomId || data.chatRoomIdAsUuid,
                        timestamp: data.timestamp ? new Date(data.timestamp) : new Date(),
                        type: data.type || 'TEXT_SIMPLE',
                        url: data.url,
                        duration: data.duration,
                    };

                    console.log('Processing new message:', formattedMessage);
                    updateMessages(formattedMessage);
                } catch (error) {
                    console.error('Error parsing message:', error);
                }
            };

            // Connection error
            ws.onerror = (error) => {
                if (!isComponentMounted) return;

                console.error('WebSocket connection error:', error);
                setErrorMessage('Failed to connect to chat server. Please try again later.');
                setIsConnected(false);
                stopPingInterval();
            };

            // Disconnection
            ws.onclose = (event) => {
                if (!isComponentMounted) return;

                console.log('WebSocket disconnected', event);
                setIsConnected(false);
                stopPingInterval();

                // Attempt to reconnect if not manually closed
                if (!event.wasClean) {
                    handleReconnect();
                }
            };
        };

        const startPingInterval = () => {
            // Clear any existing interval first
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
            }

            // Start a new ping interval
            pingIntervalRef.current = setInterval(() => {
                if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
                    console.log('Sending PING to server');
                    const pingMessage = {
                        type: 'PING',
                        timestamp: new Date().toISOString()
                    };
                    socketRef.current.send(JSON.stringify(pingMessage));
                } else {
                    console.log('WebSocket not open, cannot send ping');
                    stopPingInterval();
                    setIsConnected(false);
                    handleReconnect();
                }
            }, PING_INTERVAL);
        };

        const stopPingInterval = () => {
            if (pingIntervalRef.current) {
                clearInterval(pingIntervalRef.current);
                pingIntervalRef.current = null;
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
                        connectWebSocket();
                    }
                }, RECONNECT_DELAY);
            } else {
                console.log('Maximum reconnection attempts reached. Please refresh the page.');
                setErrorMessage('Connection lost. Maximum reconnection attempts reached. Please refresh the page.');
            }
        };

        // Initial connection
        connectWebSocket();

        // Cleanup on component unmount
        return () => {
            isComponentMounted = false;

            if (socketRef.current) {
                console.log('Closing WebSocket connection');
                socketRef.current.close(1000, "Component unmounting"); // Normal closure
            }
            stopPingInterval();
            if (reconnectTimeoutRef.current) {
                clearTimeout(reconnectTimeoutRef.current);
            }
        };
    }, [id, token, userId, userMap, reconnectAttempts]);


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

    // Send message via WebSocket
    // const sendMessage = async (message: Message) => {

    //     try {
    //         // Format the message for the server
    //         const formattedMessage = {
    //             senderId: message.senderId,
    //             content: message.content,
    //             chatRoomId: message.chatRoomId,
    //             timestamp: new Date().toISOString(),
    //             type: message.type,
    //             // appointmentId: null,
    //             // chatRoomIdAsUuid: message.chatRoomId,
    //             // senderIdAsUuid: message.senderId,
    //             // url: message.url,
    //             // duration: message.duration
    //         };

    //         const response = await JC_Services('JAPPCARE', `chat-message`, 'POST', formattedMessage, token);
    //         console.log('Message sent :', formattedMessage);

    //         if (response && response.body.meta.statusCode === 200 || response.body.meta.statusCode === 201) {
    //             console.log('Message response:', response);
    //             return true;
    //         } else {
    //             console.error('Failed to send message:', response.body.meta.message);
    //             return false;
    //         }

    //     } catch (error) {
    //         console.error('Error sending message via WebSocket:', error);
    //         return false;
    //     }
    // };

    useEffect(() => {
        // Fetch participants when component mounts
        if (id) {
            fetchChatroomParticipants();
        }
    }, [id, token]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // const handleSendMessage = async () => {
    //     if (messageInput.trim()) {
    //         const messageId = `client-${userId}-${Date.now()}`;

    //         const newUIMessage: Message = {
    //             id: messageId,
    //             senderId: userParticipantId,
    //             senderName: userMap[userId]?.name || 'You',
    //             content: messageInput,
    //             chatRoomId: id || '',
    //             timestamp: new Date(),
    //             type: 'TEXT_SIMPLE',
    //         };

    //         // Add message to UI immediately using our deduplication function
    //         updateMessages(newUIMessage);
    //         setMessageInput('');

    //         if (isConnected) {
    //             // For API - create a separate object with userId
    //             const apiMessage: Message = {
    //                 id: newUIMessage.id,
    //                 senderId: userId, // Use user ID for API
    //                 senderName: newUIMessage.senderName,
    //                 content: newUIMessage.content,
    //                 chatRoomId: newUIMessage.chatRoomId,
    //                 timestamp: newUIMessage.timestamp,
    //                 type: newUIMessage.type,
    //             };

    //             sendMessage(apiMessage);
    //         } else {
    //             console.error('WebSocket not connected. Message will only be displayed locally.');
    //         }
    //     }
    // };

    // const handleKeyPress = (event: React.KeyboardEvent) => {
    //     if (event.key === 'Enter' && !event.shiftKey) {
    //         event.preventDefault();
    //         handleSendMessage();
    //     }
    // };

    // const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const file = event.target.files?.[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onload = async (e) => {
    //             const newMessage: Message = {
    //                 id: Date.now().toString(),
    //                 senderId: userId,
    //                 senderName: userMap[userId]?.name || 'You',
    //                 content: file.name,
    //                 chatRoomId: id || '',
    //                 timestamp: new Date(),
    //                 type: 'image',
    //                 url: e.target?.result as string,
    //             };

    //             // Add to UI
    //             setMessages([...messages, newMessage]);
    //             scrollToBottom();

    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // useEffect(() => {
    //     if (isRecording) {
    //         recordingTimerRef.current = setInterval(() => {
    //             setRecordingTime((prev) => prev + 1);
    //         }, 1000);
    //     } else {
    //         clearInterval(recordingTimerRef.current);
    //         setRecordingTime(0);
    //     }

    //     return () => {
    //         clearInterval(recordingTimerRef.current);
    //     };
    // }, [isRecording]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // const handleEmojiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    //     setAnchorEl(event.currentTarget);
    // };

    const handleEmojiClose = () => {
        setAnchorEl(null);
    };

    const onEmojiSelect = (emoji: any) => {
        setMessageInput((prev) => prev + emoji.native);
        handleEmojiClose();
    };

    // const startRecording = async () => {
    //     try {
    //         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    //         const mediaRecorder = new MediaRecorder(stream);
    //         mediaRecorderRef.current = mediaRecorder;
    //         audioChunksRef.current = [];

    //         mediaRecorder.ondataavailable = (event) => {
    //             audioChunksRef.current.push(event.data);
    //         };

    //         mediaRecorder.onstop = async () => {
    //             const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
    //             const audioUrl = URL.createObjectURL(audioBlob);

    //             const newMessage: AudioMessage = {
    //                 id: Date.now().toString(),
    //                 senderId: userId,
    //                 senderName: userMap[userId]?.name || 'You',
    //                 content: 'Audio message',
    //                 chatRoomId: id || '',
    //                 timestamp: new Date(),
    //                 type: 'audio',
    //                 url: audioUrl,
    //                 duration: recordingTime,
    //             };

    //             // Add to UI
    //             setMessages([...messages, newMessage]);
    //             setAudioURL(null);
    //             scrollToBottom();

    //             if (isConnected) {
    //                 sendMessage(newMessage);
    //             } else {
    //                 console.error('WebSocket not connected. Message will only be displayed locally.');
    //             }
    //         };

    //         mediaRecorder.start();
    //         setIsRecording(true);
    //         setRecordingTime(0);
    //     } catch (error) {
    //         console.error('Error accessing microphone:', error);
    //     }
    // };

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

    // const stopRecording = () => {
    //     if (mediaRecorderRef.current && isRecording) {
    //         mediaRecorderRef.current.stop();
    //         setIsRecording(false);
    //         mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    //     }
    // };

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
                            Group Chat
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
                            {initialValues?.name || chatroomDetails?.name || 'Group Chat'}
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
                            {initialValues?.name || chatroomDetails?.name || 'Group Chat'}
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
                            // onClick={fetchChatMessages}
                            >
                                Retry
                            </Button>
                        </Box>
                    ) : messageArray.length === 0 ? (
                        <Box sx={{ textAlign: 'center', p: 4, color: '#6F767E' }}>
                            <Typography>No messages yet. Start the conversation!</Typography>
                        </Box>
                    ) : (
                        messageArray.map((message) => {
                            // const isCurrentUser = participants.some(participant => participant.id === message.senderId);
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
                                            {message.type === 'TEXT_SIMPLE' && (
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
                                    {isCurrentUser && (
                                        <Avatar
                                            sx={{
                                                width: 36,
                                                height: 36,
                                                ml: 1,
                                                bgcolor: '#1A1D1F',
                                                color: '#FF7A00',
                                                fontSize: 14
                                            }}
                                            src={userMap[userId]?.profileImage || ""}
                                        >
                                            {userMap[userId]?.name?.charAt(0).toUpperCase() || 'Y'}
                                        </Avatar>
                                    )}
                                </Box>
                            );
                        })
                    )}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                {/* <Box sx={{ p: 2, borderTop: '1px solid #F0F0F0', bgcolor: '#FFFFFF' }}>
                    {isRecording ? (
                        <Box sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            bgcolor: '#FFEDE6',
                            p: 2,
                            borderRadius: 28
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box sx={{
                                    width: 12,
                                    height: 12,
                                    borderRadius: '50%',
                                    bgcolor: '#FF0000',
                                    mr: 1,
                                    animation: 'pulse 1.5s infinite'
                                }} />
                                <Typography>Recording {formatTime(recordingTime)}</Typography>
                            </Box>
                            <IconButton onClick={stopRecording} sx={{ color: '#FF7A00' }}>
                                <StopIcon />
                            </IconButton>
                        </Box>
                    ) : (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MessageInput
                                placeholder="Type a message"
                                value={messageInput}
                                onChange={(e) => setMessageInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                fullWidth
                            />
                            <IconButton onClick={handleEmojiClick} sx={{ color: '#FF7A00' }}>
                                <EmojiEmotionsIcon />
                            </IconButton>
                            <IconButton onClick={() => fileInputRef.current?.click()} sx={{ color: '#FF7A00' }}>
                                <AttachFileIcon />
                            </IconButton>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileUpload}
                                accept="image/*"
                                style={{ display: 'none' }}
                            />
                            <IconButton onClick={startRecording} sx={{ color: '#FF7A00' }}>
                                <MicIcon />
                            </IconButton>
                            <IconButton
                                onClick={handleSendMessage}
                                disabled={!messageInput.trim()}
                                sx={{
                                    bgcolor: messageInput.trim() ? '#FF7A00' : '#F0F0F0',
                                    color: messageInput.trim() ? '#FFFFFF' : '#888888',
                                    '&:hover': {
                                        bgcolor: messageInput.trim() ? '#E57000' : '#F0F0F0',
                                    }
                                }}
                            >
                                <SendIcon />
                            </IconButton>
                        </Box>
                    )}
                </Box> */}
            </Box>

            {/* Emoji Picker Popover */}
            <Popover
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleEmojiClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <Picker data={data} onEmojiSelect={onEmojiSelect} />
            </Popover>
        </Box>
    );
};

export default Chats;