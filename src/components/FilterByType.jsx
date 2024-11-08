import React from "react";
import { FilterIcon } from "./SVGIcons";

export default function FilterByType({
  isFilterByTypeOpen,
  handleFilterByTypeClick,
  costCategories,
  selectedFilters,
  setSelectedFilters,
  type,

  errorMessage,
  setErrorMessage,
  totalData,
}) {
    const categoryHasEntries = (categoryName) => {
        return totalData.some((dataItem) => dataItem.category === categoryName);
      };
      const handleCheckboxChange = (category) => {
        setSelectedFilters((prevFilters) => {
          const updatedFilters = { ...prevFilters };
          if (!updatedFilters[type]) {
            updatedFilters[type] = [];
          }
          if (updatedFilters[type].includes(category)) {
            // Remove category if already selected
            updatedFilters[type] = updatedFilters[type].filter(
              (cat) => cat !== category
            );
          } else {
            // Add category if not already selected
            updatedFilters[type] = [...updatedFilters[type], category];
    
            // Check if the category has entries, and if not, show an error message
            if (!categoryHasEntries(category)) {
              setErrorMessage(`No entries available for category: ${category}`);
            } else {
              setErrorMessage(""); // Clear any previous error messages
            }
          }
          return updatedFilters;
        });
      };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          id="filter-button-2"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={handleFilterByTypeClick}
        >
          <FilterIcon />
        </button>
      </div>

      {isFilterByTypeOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="filter-button-2"
          tabIndex="-1"
          id="filter-dropdown2"
        >
          <div className="py-1" role="none">
            {costCategories.map((costCategory) => (
              <label
                key={costCategory.id}
                className="inline-flex items-center px-4 py-2 text-sm text-gray-700"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 rounded-md text-gray-600"
                  checked={
                    selectedFilters[type]?.includes(costCategory.name) || false
                  }
                  onChange={() => handleCheckboxChange(costCategory.name)}
                />
                <span className="ml-2">{costCategory.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
