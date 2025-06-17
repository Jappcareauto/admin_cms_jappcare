export type TimerRef = ReturnType<typeof setInterval>;


export interface Message {
    id?: string;
    senderId: string;
    content: string;
    chatRoomId: string;
    timestamp: Date | string | null;
    type: string;
    appointmentId?: string | null;
    appointmentIdAsUuid?: string | null;
    chatRoomIdAsUuid?: string | null;
    senderIdAsUuid?: string | null;
    url?: string;
    duration?: number;
    currentTime?: number;
    senderName?: string; // Added to display sender name in group chat
}

export interface AudioMessage extends Message {
    duration: number;
    currentTime?: number;
}

export interface User {
    id: string;
    name: string;
    email: string;
    profileImageUrl: string | null;
}

export interface ChatroomParticipant {
    id: string;
    user: User;
    chatRoom: {
        id: string;
        name: string;
        participantIds: string[] | null;
        createdBy: string;
        updatedBy: string;
        createdAt: string;
        updatedAt: string;
    };
}
