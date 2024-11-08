import React from "react";
import { DeleteIcon, EditIcon, IncomeIcon } from "./SVGIcons";

import ListSortFilter from "./ListSortFilter";
import { incomeCategories } from "../data/data";

export default function IncomeBoard({
  incomeData,
  handleDelete,
  handleSort,
  selectedFilters,
  setSelectedFilters,
  errorMessage,
  setErrorMessage,
  totalData,
  handleEdit,
  setFormMode,
}) {
  const costCategories = incomeCategories;
  const filteredData = selectedFilters.Income.length
    ? incomeData.filter((income) =>
        selectedFilters.Income.includes(income.category)
      )
    : incomeData; 

  return (
    <div className="border rounded-md relative">
      {/* <!-- Header --> */}
      <div className="flex items-center justify-between gap-2 bg-[#F9FAFB] py-4 px-4 rounded-md">
        <div className="flex items-center gap-2">
          {/* <!-- Icon --> */}
          <div className="h-10 w-10 bg-teal-600 text-white rounded-md text-center object-center place-content-center text-base">
            <IncomeIcon />
          </div>
          {/* <!-- Text --> */}
          <div>
            <h3 className="text-xl font-semibold leading-7 text-gray-800">
              Income
            </h3>
          </div>
        </div>
        <div>
          <ListSortFilter
            costCategories={costCategories}
            handleSort={handleSort}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            type="Income"
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            totalData={totalData}
          />
        </div>
      </div>

      <div className="p-4 divide-y">
        {
            filteredData.length===0 ? (<p> No Income Listed</p>) : ("")
        }
        {filteredData.map((income) => (
          <div
            key={income.id}
            className="flex justify-between items-center py-2 relative group cursor-pointer"
          >
            <div>
              <h3 className="text-base font-medium leading-7 text-gray-600">
                {income.category}
              </h3>
              <p className="text-xs text-gray-600">{income.date}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
                BDT {income.amount}
              </p>

              {/* <!-- 3 Dots --> */}
              <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all">
                <button
                  className="hover:text-teal-600"
                  role="button"
                  title="Edit Button"
                  onClick={() => {
                    handleEdit(income), setFormMode("edit");
                  }}
                >
                  <EditIcon />
                </button>

                <button
                  className="hover:text-red-600"
                  role="button"
                  title="Delete"
                  onClick={() => {
                    handleDelete(income.id);
                  }}
                >
                  <DeleteIcon />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm px-4 py-2">{errorMessage}</p>
      )}
    </div>
  );
}

 
