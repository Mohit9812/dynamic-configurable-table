import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCell } from '../redux/tableSlice.js';
import { applyFilters } from '../utils/filterUtils.js';
import './Table.css';

function Table() {
  const dispatch = useDispatch();

  const { columns = [], data = [], visibleColumns = [], filters = [] } = useSelector(
    (state) => state.table || {}
  );

  const filteredData = applyFilters(data, filters);

  // const handleCellChange = (rowIndex, key, value) => {
  //   const originalRowIndex = data.findIndex((row) => row === filteredData[rowIndex]);
  //   dispatch(updateCell({ rowIndex: originalRowIndex, key, value }));
  // };

  const handleCellChange = (rowKey, key, value) => {
    const rowIndex = data.findIndex(row => row.name === rowKey); // ← use actual key like id if possible
    if (rowIndex !== -1) {
      dispatch(updateCell({ rowIndex, key, value }));
    }
  };

  if (!columns.length || !data.length) {
    return <div>Loading table...</div>;
  }

  return (
    <div className="table-container">
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
          {filteredData.map((row, rowIndex) => (
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
    </div>
  );
}

export default Table;