import { TypeMessageEnum } from "@/enums/typeMessage";

export interface ChatMessageInterface {
    senderId: string,
    content: string,
    chatRoomId: string,
    timestamp: Date,
    type: string,
    appointmentId: string
}
