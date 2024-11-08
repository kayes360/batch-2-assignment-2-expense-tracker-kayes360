import React, { useState, useEffect, useRef } from "react";
import SortByCost from "./SortByCost";
import FilterByType from "./FilterByType";

export default function ListSortFilter({
  costCategories,
  handleSort,
  type,
  selectedFilters,
  setSelectedFilters,
  errorMessage,
  setErrorMessage,
  totalData,
}) {
  const [isSortByCostOpen, setSortByCostOpen] = useState(false);
  const [isFilterByTypeOpen, setFilterByTypeOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSortByCostClick = () => {
    setSortByCostOpen(!isSortByCostOpen);
    if (isFilterByTypeOpen) setFilterByTypeOpen(false); // Close filter if open
  };

  const handleFilterByTypeClick = () => {
    setFilterByTypeOpen(!isFilterByTypeOpen);
    if (isSortByCostOpen) setSortByCostOpen(false); // Close sort if open
  };

  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setSortByCostOpen(false);
      setFilterByTypeOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div ref={dropdownRef} className="space-y-4">
      <SortByCost
        isSortByCostOpen={isSortByCostOpen}
        handleSortByCostClick={handleSortByCostClick}
        handleSort={handleSort}
        setSortByCostOpen={setSortByCostOpen}
        type={type}
      />

      <FilterByType
        isFilterByTypeOpen={isFilterByTypeOpen}
        handleFilterByTypeClick={handleFilterByTypeClick}
        costCategories={costCategories}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        type={type}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        totalData={totalData}
      />
    </div>
  );
}
