"use client"; // 클라이언트 컴포넌트로 명시
import { useState } from "react";
import { Product, initialProductData, categories, colors } from "../../data/products";
import Link from "next/link";

const TableProducts: React.FC = () => {
  const [productData, setProductData] = useState<Product[]>(initialProductData);
  const [additionalRows, setAdditionalRows] = useState<Product[]>([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Product; direction: "asc" | "desc" } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFields, setEditFields] = useState<Partial<Product>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCheckboxChange = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(productData.map((_, index) => index).concat(additionalRows.map((_, index) => productData.length + index)));
    }
    setSelectAll(!selectAll);
  };

  const sortedData = () => {
    const allData = [...productData, ...additionalRows];
    if (sortConfig !== null) {
      const sortedProducts = [...allData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sortedProducts;
    }
    return allData;
  };

  const requestSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    if (index < productData.length) {
      setEditFields(productData[index]);
    } else {
      setEditFields(additionalRows[index - productData.length]);
    }
  };

  const handleEditChange = (field: keyof Product, value: string | number) => {
    setEditFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      if (editingIndex < productData.length) {
        const updatedData = [...productData];
        updatedData[editingIndex] = { ...updatedData[editingIndex], ...editFields };
        setProductData(updatedData);
      } else {
        const updatedRows = [...additionalRows];
        updatedRows[editingIndex - productData.length] = { ...updatedRows[editingIndex - productData.length], ...editFields };
        setAdditionalRows(updatedRows);
      }
      setEditingIndex(null);
      setEditFields({});
    }
  };

  const cancelEdit = () => {
    setEditingIndex(null);
    setEditFields({});
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const addRow = () => {
    const newRow = { name: "", category: "", price: 0, color: "" };
    setAdditionalRows((prev) => [...prev, newRow]);
    setEditingIndex(productData.length + additionalRows.length);
    setEditFields(newRow);

    // Calculate the total pages and set to the last page
    const totalPages = Math.ceil((productData.length + additionalRows.length + 1) / itemsPerPage);
    setCurrentPage(totalPages);
  };

  const removeSelectedRows = () => {
    const allData = [...productData, ...additionalRows];
    const remainingData = allData.filter((_, index) => !selectedItems.includes(index));
    const updatedProductData = remainingData.slice(0, initialProductData.length);
    const updatedAdditionalRows = remainingData.slice(initialProductData.length);

    setProductData(updatedProductData);
    setAdditionalRows(updatedAdditionalRows);
    setSelectedItems([]);
    setSelectAll(false);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData().slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil((productData.length + additionalRows.length) / itemsPerPage);

  const handleSaveAlert = () => {
    if (window.confirm("Do you want to save the changes?")) {
      saveEdit();
    }
  };

  const handleDeleteAlert = () => {
    if (selectedItems.length === 0) {
      alert("You have not selected any rows to delete.");
    } else if (window.confirm("Do you want to delete the selected rows?")) {
      removeSelectedRows();
    }
  };

  return (
    <div className="col-span-12 xl:col-span-7">
      <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="mb-6 flex justify-between">
          <div className="mb-2 flex w-full border-l-6 border-warning bg-warning bg-opacity-[15%] px-2 py-3 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 md:p-5">
            <div className="mr-5 flex h-7 w-7 items-center justify-center rounded-lg bg-warning bg-opacity-30">
            <svg
              width="19"
              height="16"
              viewBox="0 0 19 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.50493 16H17.5023C18.6204 16 19.3413 14.9018 18.8354 13.9735L10.8367 0.770573C10.2852 -0.256858 8.70677 -0.256858 8.15528 0.770573L0.156617 13.9735C-0.334072 14.8998 0.386764 16 1.50493 16ZM10.7585 12.9298C10.7585 13.6155 10.2223 14.1433 9.45583 14.1433C8.6894 14.1433 8.15311 13.6155 8.15311 12.9298V12.9015C8.15311 12.2159 8.6894 11.688 9.45583 11.688C10.2223 11.688 10.7585 12.2159 10.7585 12.9015V12.9298ZM8.75236 4.01062H10.2548C10.6674 4.01062 10.9127 4.33826 10.8671 4.75288L10.2071 10.1186C10.1615 10.5049 9.88572 10.7455 9.50142 10.7455C9.11929 10.7455 8.84138 10.5028 8.79579 10.1186L8.13574 4.75288C8.09449 4.33826 8.33984 4.01062 8.75236 4.01062Z"
                fill="#FBBF24"
              ></path>
            </svg>
          </div>
          <div className="w-full">
            <p className="leading-relaxed text-[#D0915C]">
              Clicking the + button creates a new input cell. Clicking the - button deletes the checked cells.
            </p>
          </div>
        </div>
          
        </div>

        <div className="flex justify-end mt-0 mb-6 space-x-2">
          <Link href="#" className="inline-flex items-center justify-center rounded-md bg-blue-950 dark:bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6" onClick={addRow}>
            +
          </Link>
          <Link href="#" className="inline-flex items-center justify-center rounded-md bg-blue-950 dark:bg-primary px-6 py-2 text-center font-medium text-white hover:bg-opacity-90 lg:px-4 xl:px-6" onClick={handleDeleteAlert}>
            -
          </Link>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-[50px_repeat(4,1fr)] rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-[50px_repeat(4,1fr)]">
            <div className="flex items-center justify-center py-5 xl:p-5">
              <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={selectAll} onChange={handleSelectAllChange} />
              <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
            </div>
            <div className="py-4 xl:p-3 cursor-pointer" onClick={() => requestSort("name")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product Name {sortConfig?.key === "name" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-4 text-center xl:p-3 cursor-pointer" onClick={() => requestSort("color")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Color {sortConfig?.key === "color" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-4 text-center xl:p-3 cursor-pointer" onClick={() => requestSort("category")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Category {sortConfig?.key === "category" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-4 text-center xl:p-3">
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Action
              </h5>
            </div>
          </div>

          {paginatedData.map((product, index) => (
            <div
              className={`grid grid-cols-[50px_repeat(4,1fr)] sm:grid-cols-[50px_repeat(4,1fr)] ${
                index === paginatedData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={index + startIndex}
            >
              <div className="flex items-center justify-center py-5 xl:p-5">
                <input id={`checkbox-table-search-${index + startIndex}`} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" checked={selectedItems.includes(index + startIndex)} onChange={() => handleCheckboxChange(index + startIndex)} />
                <label htmlFor={`checkbox-table-search-${index + startIndex}`} className="sr-only">checkbox</label>
              </div>
              <div className="flex items-center py-4 xl:p-3">
                {editingIndex === index + startIndex ? (
                  <input
                    type="text"
                    value={editFields.name || ""}
                    onChange={(e) => handleEditChange("name", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="font-medium text-black dark:text-white">{product.name}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-4 xl:p-3">
                {editingIndex === index + startIndex ? (
                  <select
                    value={editFields.color || ""}
                    onChange={(e) => handleEditChange("color", e.target.value)}
                    className="w-full"
                  >
                    {colors.map((color) => (
                      <option key={color} value={color}>
                        {color}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="font-medium text-black dark:text-white">{product.color}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-4 xl:p-3">
                {editingIndex === index + startIndex ? (
                  <select
                    value={editFields.category || ""}
                    onChange={(e) => handleEditChange("category", e.target.value)}
                    className="w-full"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="font-medium text-meta-3">{product.category}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-4 xl:p-3">
                {editingIndex === index + startIndex ? (
                  <>
                    <button className="font-medium mr-2 text-green-600 dark:text-green-500 hover:underline" onClick={handleSaveAlert}>
                      Save
                    </button>
                    <button className="font-medium text-red-600 dark:text-red-500 hover:underline" onClick={cancelEdit}>
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button className="font-medium mr-2 text-blue-500 dark:text-blue-500 hover:underline" onClick={() => startEditing(index + startIndex)}>
                      Edit
                    </button>
                    <button className="font-medium text-orange-500 dark:text-red-500 hover:underline" onClick={handleDeleteAlert}>
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center p-4 mt-9 mb-9">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`mx-1 px-3 py-1 border rounded ${currentPage === i + 1 ? 'bg-blue-950 text-white dark:bg-white dark:text-blue-950' : 'bg-transparent text-blue-950 dark:text-white'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableProducts;
