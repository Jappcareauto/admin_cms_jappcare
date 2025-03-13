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

} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { TimerRef } from './types';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import LocationIcon from '../../components/Icones/LocationIcon';
import { ArrowBack, Star } from '@mui/icons-material';
import { Chatroom } from '../../interfaces/Interfaces';



// Styled Components (previous styled components remain the same)
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

const MessageInput = styled(InputBase)(() => ({
    backgroundColor: '#FFEDE6',
    borderRadius: 28,
    padding: '8px 16px',
    width: '100%',
    '& input': {
        padding: '8px',
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



interface Message {
    id: string;
    content: string;
    type: 'text' | 'image' | 'audio';
    sender: string;
    timestamp: Date;
    url?: string;
    duration?: number;
}

interface AudioMessage extends Message {
    duration: number;
    currentTime?: number;
}

const Chats = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageInput, setMessageInput] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [audioURL, setAudioURL] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState<{ [key: string]: boolean }>({});
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [recordingTime, setRecordingTime] = useState(0);
    const [audioProgress, setAudioProgress] = useState<{ [key: string]: number }>({});
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const recordingTimerRef = useRef<TimerRef>();
    const audioElementsRef = useRef<{ [key: string]: HTMLAudioElement }>({});
    const location = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    console.log("audio", audioURL);
    console.log("id", id);

    const [services] = useState<Chatroom[]>([
        {
            id: '1',
            name: "Sara",
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '2',
            name: 'James',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '3',
            name: 'Liz',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '4',
            name: 'Clo',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '5',
            name: 'Love',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '6',
            name: 'Odilon',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '7',
            name: 'Love',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '8',
            name: 'Mike',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
        {
            id: '9',
            name: 'Collabo',
            participantIds: [],
            createdBy: null,
            updatedBy: null,
            createdAt: '',
            updatedAt: ''
        },
    ]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage: Message = {
                id: Date.now().toString(),
                content: messageInput,
                type: 'text',
                sender: 'user',
                timestamp: new Date(),
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
            scrollToBottom();
        }
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newMessage: Message = {
                    id: Date.now().toString(),
                    content: file.name,
                    type: 'image',
                    sender: 'user',
                    timestamp: new Date(),
                    url: e.target?.result as string,
                };
                setMessages([...messages, newMessage]);
                scrollToBottom();
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        if (isRecording) {
            recordingTimerRef.current = setInterval(() => {
                setRecordingTime((prev) => prev + 1);
            }, 1000);
        } else {
            clearInterval(recordingTimerRef.current);
            setRecordingTime(0);
        }

        return () => {
            clearInterval(recordingTimerRef.current);
        };
    }, [isRecording]);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleEmojiClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleEmojiClose = () => {
        setAnchorEl(null);
    };

    const onEmojiSelect = (emoji: any) => {
        setMessageInput((prev) => prev + emoji.native);
        handleEmojiClose();
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioUrl = URL.createObjectURL(audioBlob);
                const newMessage: AudioMessage = {
                    id: Date.now().toString(),
                    content: 'Audio message',
                    type: 'audio',
                    sender: 'user',
                    timestamp: new Date(),
                    url: audioUrl,
                    duration: recordingTime,
                };
                setMessages([...messages, newMessage]);
                setAudioURL(null);
                scrollToBottom();
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
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

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const renderAudioMessage = (message: Message) => {
        if (message.type !== 'audio' || !message.url) return null;

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 250 }}>
                <IconButton
                    onClick={() => toggleAudioPlay(message.id, message.url!)}
                    size="small"
                >
                    {isPlaying[message.id] ? <PauseIcon /> : <PlayArrowIcon />}
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
                            width: `${audioProgress[message.id] || 0}%`,
                            transition: 'width 0.1s linear'
                        }}
                    />
                </Box>
                <Typography variant="caption">
                    {isPlaying[message.id]
                        ? formatTime(Math.floor((audioProgress[message.id] || 0) * (message.duration || 0) / 100))
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

    console.log("chatsData=======", location.state);



    return (
        <Box sx={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
            {/* Left Sidebar */}


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
                            Chats
                        </Typography>
                    </Box>
                </Box>
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
                    DG
                </Avatar>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>

                        <Box>
                            <Typography sx={{
                                fontSize: '20px',
                                fontWeight: 600,
                                color: '#1A1D1F'
                            }}>
                                {initialValues?.name}

                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                <LocationIcon fill='#FF7A00' stroke='#FF7A00' />
                                <Typography sx={{
                                    fontSize: '12px',
                                    color: '#6F767E'
                                }}>
                                    Deido, Douala
                                </Typography>
                                <Box sx={{ border: '1px solid #111111', height: '5px', width: '5px', borderRadius: '50%', bgcolor: '#111111', ml: 0.5 }} />
                                <Star sx={{ color: '#FF7A00' }} />
                                <Typography sx={{ color: '#FF7A00', fontSize: '15px' }}>
                                    4.75
                                </Typography>
                            </Box>


                        </Box>
                        <Button
                            variant="outlined"
                            sx={{
                                // bgcolor: '#fff',
                                border: '1px solid #6F767E',
                                color: '#111111',
                                maxWidth: '150px',
                                height: 35,
                                padding: '20px 16px',
                                '&:hover': {
                                    bgcolor: '#f5f5f5'
                                }
                            }}
                            onClick={() => { navigate('/profile') }}
                        >
                            View Profile
                        </Button>
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

                <Box sx={{ mb: 2 }}>
                    <SearchInput
                        placeholder="Search"
                        startAdornment={<SearchIcon sx={{ color: '#666', mr: 1 }} />}
                    />
                </Box>

                <List sx={{ p: 0 }}>
                    {services.map((service) => (
                        <ServiceItem key={service.id}>
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
                                    {service.name?.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={service.name} />
                        </ServiceItem>
                    ))}
                </List>
            </Box>

            {/* Chat Area */}
            <Box sx={{
                flex: 1, display: 'flex', flexDirection: 'column', height: '85vh', overflow: 'hidden'
            }}>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', zIndex: 1 }}>
                    <Avatar sx={{
                        mr: 1,
                        bgcolor: '#FF7A00',
                        color: '#fff',
                        border: '2px solid #FF7A00',
                        width: 48,
                        height: 48,
                        fontSize: 16,
                        fontWeight: 600,
                        boxShadow: 'inset 0 0 0 1px rgb(247, 249, 250)',
                    }}>S</Avatar>
                    <Typography variant="h6">Sara</Typography>
                </Box>

                {/* Messages Area */}
                <Box sx={{
                    flex: 1, p: 2, overflowY: 'auto', display: 'flex', flexDirection: 'column'
                }}>
                    {messages.map((message) => (
                        <Box
                            key={message.id}
                            sx={{
                                display: 'flex',
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 2
                            }}
                        >
                            <Paper sx={{
                                p: 2,
                                maxWidth: '70%',
                                bgcolor: '#FFEDE6',
                                borderRadius: 1
                            }}>
                                {message.type === 'text' && (
                                    <Typography>{message.content}</Typography>
                                )}
                                {message.type === 'image' && message.url && (
                                    <Box
                                        component="img"
                                        src={message.url}
                                        sx={{ maxWidth: '100%', borderRadius: 1 }}
                                    />
                                )}
                                {message.type === 'audio' && renderAudioMessage(message)}
                            </Paper>
                        </Box>
                    ))}
                    <div ref={messagesEndRef} />
                </Box>

                {/* Input Area */}
                <Box sx={{ p: 2, borderTop: '1px solid #F0F0F0', position: 'relative', zIndex: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MessageInput
                            placeholder="Write a message"
                            fullWidth
                            value={messageInput}
                            onChange={(e) => setMessageInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <IconButton onClick={handleEmojiClick}>
                            <EmojiEmotionsIcon />
                        </IconButton>
                        <Popover
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleEmojiClose}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                        >
                            <Picker data={data} onEmojiSelect={onEmojiSelect} />
                        </Popover>
                        <IconButton onClick={() => fileInputRef.current?.click()}>
                            <AttachFileIcon />
                        </IconButton>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            style={{ display: 'none', backgroundColor: '#FB7C37' }}
                            accept="image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                        <IconButton
                            onClick={isRecording ? stopRecording : startRecording}
                            sx={{ color: isRecording ? 'red' : 'inherit' }}
                        >
                            {isRecording ? (
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <StopIcon />
                                    <Typography variant="caption" sx={{ color: 'red' }}>
                                        {formatTime(recordingTime)}
                                    </Typography>
                                </Box>
                            ) : (
                                <MicIcon />
                            )}
                        </IconButton>
                        <IconButton
                            onClick={handleSendMessage}
                            sx={{ bgcolor: '#FB7C37', color: 'white', '&:hover': { bgcolor: '#FF7A00' } }}
                        >
                            <SendIcon />
                        </IconButton>
                    </Box>
                </Box>


            </Box>
        </Box>
    );
};

export default Chats;