"use client"; // 클라이언트 컴포넌트로 명시
import { useState } from "react";
import { Order, initialOrderData, statuses } from "../../data/orders";

const TableOrders: React.FC = () => {
  const [orderData, setOrderData] = useState<Order[]>(initialOrderData);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Order; direction: "asc" | "desc" } | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editFields, setEditFields] = useState<Partial<Order>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const sortedData = () => {
    if (sortConfig !== null) {
      const sortedOrders = [...orderData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
      return sortedOrders;
    }
    return orderData;
  };

  const requestSort = (key: keyof Order) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const startEditing = (index: number) => {
    setEditingIndex(index);
    setEditFields(orderData[index]);
  };

  const handleEditChange = (field: keyof Order, value: string | number) => {
    setEditFields((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveEdit = () => {
    if (editingIndex !== null) {
      const updatedData = [...orderData];
      updatedData[editingIndex] = { ...updatedData[editingIndex], ...editFields };
      setOrderData(updatedData);
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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData().slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(orderData.length / itemsPerPage);

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
                Clicking a table header cell activates the sorting function.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="grid grid-cols-[1.5fr_1.5fr_2.5fr_1.2fr_1.7fr_1.2fr] rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-[1.5fr_1.5fr_2.5fr_1.2fr_1.7fr_1.2fr]">
            <div className="py-6 xl:p-4 cursor-pointer" onClick={() => requestSort("orderId")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Order ID {sortConfig?.key === "orderId" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-6 xl:p-4 cursor-pointer" onClick={() => requestSort("customerName")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Customer Name {sortConfig?.key === "customerName" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-6 text-center xl:p-4 cursor-pointer" onClick={() => requestSort("product")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Product {sortConfig?.key === "product" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-6 text-center xl:p-4 cursor-pointer" onClick={() => requestSort("quantity")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Quantity {sortConfig?.key === "quantity" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-6 text-center xl:p-4 cursor-pointer" onClick={() => requestSort("totalPrice")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Total Price {sortConfig?.key === "totalPrice" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
            <div className="py-6 text-center xl:p-4 cursor-pointer" onClick={() => requestSort("status")}>
              <h5 className="text-sm font-medium uppercase xsm:text-base">
                Status {sortConfig?.key === "status" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
              </h5>
            </div>
          </div>

          {paginatedData.map((order, index) => (
            <div
              className={`grid grid-cols-[1.5fr_1.5fr_2.5fr_1.2fr_1.7fr_1.2fr] sm:grid-cols-[1.5fr_1.5fr_2.5fr_1.2fr_1.7fr_1.2fr] ${
                index === paginatedData.length - 1
                  ? ""
                  : "border-b border-stroke dark:border-strokedark"
              }`}
              key={index + startIndex}
            >
              <div className="flex items-center py-6 xl:p-4">
                {editingIndex === index + startIndex ? (
                  <input
                    type="text"
                    value={editFields.orderId || ""}
                    onChange={(e) => handleEditChange("orderId", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-black dark:text-white">{order.orderId}</p>
                )}
              </div>

              <div className="flex items-center py-6 xl:p-4">
                {editingIndex === index + startIndex ? (
                  <input
                    type="text"
                    value={editFields.customerName || ""}
                    onChange={(e) => handleEditChange("customerName", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-black dark:text-white">{order.customerName}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-6 xl:p-4">
                {editingIndex === index + startIndex ? (
                  <input
                    type="text"
                    value={editFields.product || ""}
                    onChange={(e) => handleEditChange("product", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-black dark:text-white">{order.product}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-6 xl:p-4">
                {editingIndex === index + startIndex ? (
                  <input
                    type="number"
                    value={editFields.quantity || ""}
                    onChange={(e) => handleEditChange("quantity", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-black dark:text-white">{order.quantity}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-6 xl:p-4">
                {editingIndex === index + startIndex ? (
                  <input
                    type="number"
                    value={editFields.totalPrice || ""}
                    onChange={(e) => handleEditChange("totalPrice", e.target.value)}
                    className="w-full"
                  />
                ) : (
                  <p className="text-black dark:text-white">{`$${order.totalPrice}`}</p>
                )}
              </div>

              <div className="flex items-center justify-center py-6 xl:p-4">
                {editingIndex === index + startIndex ? (
                  <select
                    value={editFields.status || ""}
                    onChange={(e) => handleEditChange("status", e.target.value)}
                    className="w-full"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p
                    className={`inline-flex rounded-full bg-opacity-10 px-3 py-1 text-sm font-medium ${
                      order.status === "Delivered"
                        ? "bg-success text-success"
                        : order.status === "Cancelled"
                        ? "bg-danger text-danger"
                        : "bg-warning text-warning"
                    }`}
                  >
                    {order.status}
                  </p>
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

export default TableOrders;
