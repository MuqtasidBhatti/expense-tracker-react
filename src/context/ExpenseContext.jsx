import React, { createContext, useContext, useState } from 'react'

const ExpenseContext = createContext(null)

export const ExpenseProvider = ({ children }) => {
    const [data, setData] = useState({
        expense: [],
        filter: "",
        dateFilter: "",
        input: {
            spent: "",
            amount: "",
            category: "",
        }
    })

    const addExpense = () => {
        const { spent, amount, category } = data.input

        if (!spent || !amount || !category) return;

        setData(prev => ({
            ...prev,
            expense: [
                ...prev.expense,
                {
                    id: Date.now(),
                    spent,
                    amount: Number(amount),
                    category,
                    date: new Date().toISOString()
                }
            ],
            input: {
                spent: "",
                amount: "",
                category: "",
            }
        }))
    }

    const filteredData = data.expense.filter(item => {
        const matchCategory = data.filter === "" || item.category === data.filter;

        let matchDate = true;

        if(data.dateFilter === "This Week") {
            const now = new Date();
            const weekAgo = new Date();
            weekAgo.setData(now.getDate() - 7);
            matchDate = new Date(item.date) >= weekAgo; 
        }

        if(data.dateFilter === "This Month") {
            const now = new Date();
            matchDate = 
                new Date(item.date).getMonth() === now.getMonth() &&
                new Date(item.date).getFullYear() === now.getFullYear();
        }
        return matchCategory && matchDate;
    })


    return (
        <ExpenseContext.Provider value={{ data, setData, addExpense, filteredData }}>
            {children}
        </ExpenseContext.Provider>
    )
}

export const useExpense = () => {
    const context = useContext(ExpenseContext)
    if (!context) {
        throw new Error("You must use useExpense in ExpenseContext")
    }
    return context
}

export default ExpenseContext
