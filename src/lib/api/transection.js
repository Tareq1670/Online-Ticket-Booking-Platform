import { serverDataFetch } from "../core/server"

export const getTransaction = async(userId) => {
    return serverDataFetch(`/api/users/transactions?userId=${userId}`)
}