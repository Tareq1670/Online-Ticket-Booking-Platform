
import { serverMutation } from "../core/server"

export const AddTicket = (ticketData) => {
    return serverMutation(`/api/add-ticket`, ticketData)
} 


export const updateMyAddedTicket = async(ticketId, ticketData) =>{
    return serverMutation(`/api/vendor/my-tickets/${ticketId}`,ticketData, "PATCH")
}

const baseUrl = process.env.NEXT_PUBLIC_URL;
export const deleteMyAddedTicket = async(ticketId) => {
    const res = await fetch(`${baseUrl}/api/vendor/my-tickets/${ticketId}`,{
        method : "DELETE"
    })
    return res.json();
}