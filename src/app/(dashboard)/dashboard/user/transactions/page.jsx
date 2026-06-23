import { getTransaction } from "@/lib/api/transection";
import { getUser } from "@/lib/core/session";
import TransactionHistoryTable from "./TransactionHistoryTable";

const TransactionPage = async () => {
    const user = await getUser();
    const response = await getTransaction(user?.id);
    const transactions = response?.data || [];

    return <TransactionHistoryTable transactions={transactions} />;
};

export default TransactionPage;