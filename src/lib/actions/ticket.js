
import { serverMutation } from "../core/server"

export const AddTicket = (ticketData) => {
    return serverMutation(`/api/add-ticket`, ticketData)
} 


export const updateMyAddedTicket = async(ticketId, ticketData) =>{
    return serverMutation(`/api/vendor/my-tickets/${ticketId}`,ticketData, "PATCH")
}