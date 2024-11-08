import React from 'react'

export default function BalanceStat({totalData}) {  
   
    const totalExpense = totalData.filter(data =>data.type === 'Expense').reduce((acc, item) => acc + item.amount,0)
    const totalIncome = totalData.filter(data =>data.type === 'Income').reduce((acc, item) => acc + item.amount,0)
    const balance = totalIncome - totalExpense;
 
    

  return (
    // Total Balance Stat 
    <div className="bg-white">
    <div className="mx-auto max-w-7xl">
      <dl className="grid grid-cols-1 text-center lg:grid-cols-3 divide-x-2 border rounded-md overflow-hidden">
        <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
          <dt className="text-base leading-7 text-gray-600">Balance</dt>
          <dd className={`order-first text-xl font-semibold tracking-tight sm:text-3xl ${balance<0 ? 'text-red-700' : 'text-gray-700' }`}>BDT {balance}</dd>
        </div>
        <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
          <dt className="text-base leading-7 text-gray-600">Total Income</dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">BDT {totalIncome}</dd>
        </div>
        <div className="bg-[#F9FAFB] flex lg:max-w-xs flex-col px-4 py-4">
          <dt className="text-base leading-7 text-gray-600">Total Expense</dt>
          <dd className="order-first text-xl font-semibold tracking-tight text-gray-700 sm:text-3xl">BDT {totalExpense}</dd>
        </div>
      </dl>
    </div>
  </div>
  )
}
