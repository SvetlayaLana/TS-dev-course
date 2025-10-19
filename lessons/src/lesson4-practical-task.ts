/* Створити типи для кількох видів транзакцій (debit, credit, refund)
   реалізувати наступний функціонал:
   1. створення транзакції
   2. отримання даних транзакції
   3. отримання всіх транзакцій певного виду
   4. оновлення транзакції
   5. отримання summary по всіх типах транзакцій (кількість транзакцій та загальна сума) */

type TransactionType = "debit" | "credit" | "refund";

type Transaction = {
    id: string;
    type: TransactionType;
    amount: number;
    createdAt: Date;
}

type TransactionData = Omit<Transaction, "id" | "createdAt">

type SummaryItem = {
    count: number;
    totalAmount: number;
}
type TransactionSummary = Record<TransactionType, SummaryItem>

const transactions: Transaction[] = [
    { id: "1", type: "debit", amount: 200, createdAt: new Date() },
    { id: "2", type: "credit", amount: 20, createdAt: new Date() },
    { id: "3", type: "refund", amount: 150, createdAt: new Date() },
    { id: "4", type: "debit", amount: 70, createdAt: new Date() },
    { id: "5", type: "credit", amount: 100, createdAt: new Date() },
    { id: "6", type: "refund", amount: 200, createdAt: new Date() },
    { id: "7", type: "debit", amount: 250, createdAt: new Date() },
    { id: "8", type: "credit", amount: 200, createdAt: new Date() },
]