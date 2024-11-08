import React from "react";
import {
  DeleteIcon,
  EditIcon,
  ExpenseIcon,
  FilterIcon,
  SortIcon,
} from "./SVGIcons";
import SortByCost from "./SortByCost";
import FilterByType from "./FilterByType";
import ListSortFilter from "./ListSortFilter";
import { expenseCategories } from "../data/data";

export default function ExpenseBoard({
  expenseData,
  handleDelete,
  handleSort,
  selectedFilters,
  setSelectedFilters,
  errorMessage,
  setErrorMessage,
  totalData,
  setEditableItem,
  handleEdit,
  setFormMode,
}) {
  const costCategories = expenseCategories;

  const filteredData = selectedFilters.Expense.length
    ? expenseData.filter((expense) =>
        selectedFilters.Expense.includes(expense.category)
      )
    : expenseData;

  return (
    <div className="border rounded-md">
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {/* <!-- Icon --> */}
          <div className="h-10 w-10 bg-pink-600 text-white rounded-md text-center object-center place-content-center text-base">
            <ExpenseIcon />
          </div>
          {/* <!-- Text --> */}
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Expense
            </h3>
          </div>
        </div>

        {/* <!-- Sorting and Filtering Column --> */}
        <div>
          <ListSortFilter
            costCategories={costCategories}
            handleSort={handleSort}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            type="Expense"
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            totalData={totalData}
          />
        </div>
        {/* <!-- Sorting and Filtering Column Ends --> */}
      </div>

      <div className="p-4 divide-y">
        {/* <!-- Expense Row 1 --> */}
        {
            filteredData.length===0 ? (<p> No Expense Listed</p>) : ("")
        }
        {filteredData.map((expense) => (
          <div
            key={expense.id}
            className="flex justify-between items-center py-2 relative group cursor-pointer"
          >
            <div>
              <h3 className="text-base font-medium leading-7 text-gray-600">
                {expense.category}
              </h3>
              <p className="text-xs text-gray-600">{expense.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                BDT {expense.amount}
              </p>

              {/* <!-- 3 Dots --> */}
              <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                <button
                  className="hover:text-teal-600"
                  role="button"
                  title="Edit Button"
                  onClick={() => {
                    handleEdit(expense);
                    setFormMode("edit");
                  }}
                >
                  <EditIcon />
                </button>

                <button
                  className="hover:text-red-600"
                  role="button"
                  title="Delete"
                  onClick={() => {
                    handleDelete(expense.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
        {errorMessage && (
          <p className="text-red-500 text-sm px-4 py-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
