import { serverDelete, serverMutation } from "../core/client";


export const AddTicket = (ticketData) => {
    return serverMutation(`/api/add-ticket`, ticketData)
} 


export const updateMyAddedTicket = async(ticketId, ticketData) =>{
    return serverMutation(`/api/vendor/my-tickets/${ticketId}`,ticketData, "PATCH")
}



export const deleteMyAddedTicket = async (ticketId) => {
    return serverDelete(`/api/vendor/my-tickets/${ticketId}`);
};