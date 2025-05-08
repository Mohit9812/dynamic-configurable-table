import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCell } from '../redux/tableSlice.js';
import { applyFilters } from '../utils/filterUtils.js';
import * as XLSX from 'xlsx'; // Import XLSX for Excel export
import { saveAs } from 'file-saver'; // Import file-saver to save the Excel file
import './Table.css';

function Table() {
  const dispatch = useDispatch();

  const { columns = [], data = [], visibleColumns = [], filters = [] } = useSelector(
    (state) => state.table || {}
  );

  const filteredData = applyFilters(data, filters);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCellChange = (rowKey, key, value) => {
    const rowIndex = data.findIndex(row => row.name === rowKey);
    if (rowIndex !== -1) {
      dispatch(updateCell({ rowIndex, key, value }));
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredData]);

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages]);

  if (!columns.length || !data.length) {
    return <div>Loading table...</div>;
  }

  const exportToExcel = () => {
    const exportData = filteredData.map((row) => {
      const exportRow = {};
      columns.forEach((col) => {
        if (visibleColumns.includes(col.key)) {
          exportRow[col.displayName] = row[col.key] || ''; // Use column display name as header
        }
      });
      return exportRow;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Table Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'table-data.xlsx');
  };

  return (
    <div className="table-container">
      <div className="export-container">
        <button onClick={exportToExcel} className="export-button">
          Export to Excel
        </button>
      </div>

      <table>
        <thead>
          <tr>
            {columns
              .filter((col) => visibleColumns.includes(col.key))
              .map((col) => (
                <th key={col.key}>{col.displayName}</th>
              ))}
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns
                .filter((col) => visibleColumns.includes(col.key))
                .map((col) => (
                  <td key={col.key} data-label={col.displayName}>
                    {col.type === 'options' ? (
                      <select
                        value={row[col.key] !== undefined ? row[col.key] : ""}
                        onChange={(e) => handleCellChange(row.name, col.key, e.target.value)}
                      >
                        {col.options.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={
                          col.type === 'number'
                            ? 'number'
                            : col.type === 'date'
                              ? 'date'
                              : 'text'
                        }
                        value={row[col.key] !== undefined ? row[col.key] : ""}
                        onChange={(e) => handleCellChange(row.name, col.key, e.target.value)}
                      />
                    )}
                  </td>
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={currentPage === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Table;