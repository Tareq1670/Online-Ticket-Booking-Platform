
import { serverMutation } from "../core/server"

export const AddTicket = (ticketData) => {
    return serverMutation(`/api/add-ticket`, ticketData)
} 

