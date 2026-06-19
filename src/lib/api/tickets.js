import { serverDataFetch } from "../core/server";

export const getMyAddedTickets = async(vendorId)=> {
    return serverDataFetch(`/api/vendor/my-tickets?vendorId=${vendorId}`,{
        cache : "no-store"
    })
}