import React, { useEffect, useState } from "react";
import { expenseCategories, incomeCategories } from "../data/data";

export default function TrackerForm({
  formMode,
  formData,
  setFormData,
  setTotalData,
  totalData,
  editableItem,
}) {
  const [selectedCostType, setSelectedCostType] = useState(
    editableItem?.type || ""
  );

  const categories =
    selectedCostType === "Income" ? incomeCategories : expenseCategories;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      type: selectedCostType,
      [name]: value,
    }));
  };
  const addData = (data) => {
    setTotalData([...totalData, data]);
  };
  const updateData = (data) => {
    setTotalData(totalData.map((item) => (item.id === data.id ? data : item)));
  };
  const resetForm = () => {
    setFormData({
      type: "",
      category: "",
      amount: "",
      date: "",
    });
    setSelectedCostType("");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
        !formData.type ||
        !formData.category ||
        !formData.amount ||
        !formData.date
      ) {
        alert("Please fill out all fields before submitting.");
        return;
      }
    const data = {
      id: formMode === "edit" ? editableItem.id : crypto.randomUUID(),
      type: formData.type,
      category: formData.category,
      amount: parseFloat(formData.amount),
      date: formData.date,
    }; 
    if (formMode === "add") {
      addData(data);
    } else if (formMode === "edit") { 
      updateData(data);
    }
    resetForm()
  };
  useEffect(() => {
    if (editableItem) {
      setFormData(editableItem);
      setSelectedCostType(editableItem.type);
    }
  }, [editableItem, setFormData]);
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex divide-x divide-slate-400/20 overflow-hidden rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm ring-1 ring-slate-700/10 mt-6">
        <div
          className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
            selectedCostType === "Expense" ? "active" : ""
          }`}
          onClick={() => setSelectedCostType("Expense")}
        >
          Expense
        </div>
        <div
          className={`cursor-pointer text-center flex-1 px-4 py-2 hover:bg-slate-50 hover:text-slate-900 ${
            selectedCostType === "Income" ? "active" : ""
          }`}
          onClick={() => setSelectedCostType("Income")}
        >
          Income
        </div>
      </div>

      {/* <!-- Note --> */}
      {/* <!-- Income Categories - Salary, Outsourcing, Bond, Dividend --> */}
      <div className="mt-3">
        <label
          htmlFor="category"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Category
        </label>
        <div className="mt-2">
          <select
            id="category"
            name="category"
            autoComplete="category-name"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={formData.category || ""}
            onChange={handleChange}
          >
            <option value="" disabled>
    Select a category
  </option>
            {categories.map((category, index) => (
              <option key={category.id} value={category.name || ""}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="amount"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Amount
        </label>
        <div className="mt-2">
          <input
            type="number"
            name="amount"
            id="amount"
            autoComplete="off"
            placeholder="12931"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={formData.amount || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mt-3">
        <label
          htmlFor="date"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Date
        </label>
        <div className="mt-2">
          <input
            type="date"
            name="date"
            id="date"
            autoComplete="off"
            placeholder="12931"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            value={formData.date || ""}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 rounded-md bg-teal-600 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 w-full"
      >
        Save
      </button>
    </form>
  );
}
