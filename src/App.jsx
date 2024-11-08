import { useEffect, useState } from "react";
import BalanceStat from "./components/BalanceStat";
import ExpenseBoard from "./components/ExpenseBoard";
import IncomeBoard from "./components/IncomeBoard";
import Navbar from "./components/Navbar";
import TrackerForm from "./components/TrackerForm";

function App() {
  const [totalData, setTotalData] = useState([]);
  const [formMode, setFormMode] = useState("add");
  const [formData, setFormData] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
  });
  const [editableItem, setEditableItem] = useState({});
  const [expenseErrorMessage, setExpenseErrorMessage] = useState("");
  const [incomeErrorMessage, setIncomeErrorMessage] = useState("");

  const [selectedFilters, setSelectedFilters] = useState({
    Expense: [],
    Income: [],
  });
  const expenseData = totalData.filter((item) => item.type === "Expense");
  const incomeData = totalData.filter((item) => item.type === "Income");
  const handleDelete = (id) => {
    const filteredData = totalData.filter((data) => data.id !== id);
    setTotalData(filteredData);
  };
  const handleEdit = (data) => { 
    setEditableItem(data)
  };
  const handleSort = (sortOrder, type) => {
    const data = type === "Expense" ? [...expenseData] : [...incomeData];

    if (sortOrder === "asc") {
      data.sort((a, b) => a.amount - b.amount);
    } else if (sortOrder === "desc") {
      data.sort((a, b) => b.amount - a.amount);
    }

    setTotalData((prevData) => {
      const filteredData = prevData.filter((item) => item.type !== type);
      return [...filteredData, ...data];
    });
  };

  return (
    <>
      <Navbar />
      <main className="relative mx-auto mt-10 w-full max-w-7xl">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* <!-- Submission Form --> */}
          <div className="p-6 py-8 bg-[#F9FAFB] border rounded-md">
            <h2 className="text-3xl font-semibold leading-7 text-gray-800 text-center">
              Expense Tracker
            </h2>

            <TrackerForm
              formMode={formMode}
              formData={formData}
              setFormData={setFormData}
              setTotalData={setTotalData}
              totalData={totalData}
              editableItem={editableItem}
            />
          </div>

          {/* <!-- Right Column --> */}
          <div className="lg:col-span-2">
            <BalanceStat totalData={totalData} />

            {/* <!-- List Down --> */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <ExpenseBoard
                expenseData={expenseData}
                handleDelete={handleDelete}
                handleSort={handleSort}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                errorMessage={expenseErrorMessage}
                setErrorMessage={setExpenseErrorMessage}
                type="Expense"
                totalData={totalData}
                setEditableItem={setEditableItem}
                handleEdit={handleEdit}
                setFormMode={setFormMode}
              />

              <IncomeBoard
                incomeData={incomeData}
                handleDelete={handleDelete}
                handleSort={handleSort}
                selectedFilters={selectedFilters}
                setSelectedFilters={setSelectedFilters}
                errorMessage={incomeErrorMessage}
                setErrorMessage={setIncomeErrorMessage}
                type="Income"
                totalData={totalData}
                setEditableItem={setEditableItem}
                handleEdit={handleEdit}
                setFormMode={setFormMode}
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
