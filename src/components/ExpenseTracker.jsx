import React from 'react'
import { useExpense } from '../context/ExpenseContext'

const ExpenseTracker = () => {
    const { data, setData, addExpense, filteredData } = useExpense()

    const handleAdd = () => {
        addExpense(data.input)
        setData(prev => ({
            ...prev,
            input: {
                spent: "",
                amount: "",
                category: ""
            }
        })
        )
    }

    const total = filteredData.reduce(
        (sum, item) => sum + Number(item.amount),
        0
    )


    return (
        <div className="relative min-h-screen bg-linear-to-br from-emerald-900 via-teal-900 to-slate-950 flex items-center justify-center p-6 overflow-hidden">

            <div className="absolute w-[500px] h-[500px] bg-emerald-500/20 rounded-full blur-3xl -top-32 -left-32" />
            <div className="absolute w-[400px] h-[400px] bg-teal-400/20 rounded-full blur-3xl -bottom-32 -right-32" />

            <div className="relative w-full max-w-2xl bg-white/10 backdrop-blur-2xl shadow-2xl rounded-3xl p-8 border border-white/20">

                <h2 className="text-4xl font-extrabold text-center bg-linear-to-r from-emerald-500 to-teal-400 bg-clip-text text-transparent mb-8">
                    Expense Tracker App
                </h2>

                <div className='mb-5'>
                    <label className="text-sm font-semibold text-emerald-300 mb-1 block">
                        Filter by Category
                    </label>
                    <select
                        className="w-full p-3 rounded-xl border border-white/20 bg-white/10 text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                        value={data.filter}
                        onChange={(e) =>
                            setData(prev => ({
                                ...prev,
                                filter: e.target.value
                            }))
                        }
                    >
                        <option value="" className='text-black'>All</option>
                        <option value="Food & Groceries" className='text-black'>Food & Groceries</option>
                        <option value="Transportation" className='text-black'>Transportation</option>
                        <option value="Health" className='text-black'>Health</option>
                        <option value="Housing & Utilities" className='text-black'>Housing & Utilities</option>
                    </select>
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-5">
                    <input
                        className="p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-emerald-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        type="text"
                        value={data.input.spent}
                        onChange={(e) =>
                            setData(prev => ({
                                ...prev,
                                input: {
                                    ...prev.input,
                                    spent: e.target.value
                                }
                            }))}
                        placeholder='Spent On'
                    />

                    <input
                        className="p-3 rounded-xl border border-white/20 bg-white/10 text-white placeholder-emerald-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                        type="number"
                        value={data.input.amount}
                        onChange={(e) => setData(prev => ({
                            ...prev,
                            input: {
                                ...prev.input,
                                amount: e.target.value
                            }
                        }))}
                        placeholder='Amount'
                    />

                    <select
                        className="p-3 rounded-xl border border-white/20 bg-white/10 text-emerald-300 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-400 transition "
                        value={data.input.category}
                        onChange={(e) =>
                            setData(prev => ({
                                ...prev,
                                input: {
                                    ...prev.input,
                                    category: e.target.value
                                }
                            }))
                        }
                    >
                        <option value="" className="text-black">Select Category</option>
                        <option value="Food & Groceries" className="text-black">Food & Groceries</option>
                        <option value="Transportation" className="text-black">Transportation</option>
                        <option value="Health" className="text-black">Health</option>
                        <option value="Housing & Utilities" className="text-black">Housing & Utilities</option>
                    </select>
                </div>

                <div className="mb-6">

                    <label className="text-sm font-semibold text-emerald-300 mb-1 block">
                        Filter by Date
                    </label>
                    <select
                        className="p-3 rounded-xl border border-white/20 bg-white/10 text-emerald-300 shadow-sm
                         focus:outline-none focus:ring-2 focus:ring-emerald-400 transition "
                        value={data.dateFilter}
                        onChange={(e) =>
                            setData(prev => ({
                                ...prev,
                                dateFilter: e.target.value
                            }))
                        }
                    >
                        <option value="All" className="text-black">All</option>
                        <option value="This week" className="text-black">This week</option>
                        <option value="This month" className="text-black">This month</option>
                    </select>
                </div>



                <button
                    className="w-full bg-linear-to-r from-emerald-400 to-teal-300 hover:scale-[1.02] hover:from-emerald-500 active:scale-95 transition-all duration-200 text-slate-900 font-semibold py-3 rounded-xl shadow-lg shadow-emerald-500/30 mb-8 cursor-pointer"
                    onClick={handleAdd}
                >
                    Add Expense
                </button>

                <div className="space-y-4 max-h-72 overflow-y-auto overflow-x-hidden pr-2 py-2">
                    {filteredData.map(item =>
                        <div
                            key={item.id}
                            className="bg-white/10 border border-white/20 rounded-2xl p-4 shadow-md hover:shadow-2xl hover:shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300 ease-out"
                        >
                            <div className="flex justify-between items-center">
                                <h2 className="text-lg font-bold text-white">
                                    {item.spent}
                                </h2>
                                <p className="text-emerald-300 font-extrabold text-lg">
                                    Rs {item.amount}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mt-2 text-sm">
                                <span className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-full capitalize">
                                    {item.category}
                                </span>
                                
                                <span className="text-xs text-emerald-400">
                                    {new Date(item.date).toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                        </div>
                    )}
                    {filteredData.length === 0 && (
                        <p className="text-center text-emerald-300 py-6">
                            No expenses added yet.
                        </p>
                    )}
                </div>
                <div className="mt-6 bg-linear-to-r from-emerald-600 to-teal-600 text-slate-900 p-4 rounded-2xl shadow-2xl shadow-emerald-500/40 flex justify-between items-center">
                    <span className="font-semibold text-lg">Total Expense</span>
                    <span className="text-2xl font-bold">Rs {total}</span>
                </div>

            </div>

        </div>
    )
}

export default ExpenseTracker
