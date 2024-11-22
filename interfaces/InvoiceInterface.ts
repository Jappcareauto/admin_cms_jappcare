import { AppointmentInterface } from "./AppointmentInterface"

export interface InvoiceInterface {

    money: {
        amount: 0,
        currency: "XAF"
    },
    dueDate: string,
    paidDate: string,
    appointmentId: string,
    appointment: AppointmentInterface
    id: string,
    createdAt: string,
    updatedAt: string,
    createdBy: string,
    updatedBy: string,
    isPaid: true
}
