import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from '../redux/tableSlice.js';
import { FaPlus, FaTrash } from 'react-icons/fa';

function FilterPanel() {
  const dispatch = useDispatch();
  const { columns = [], filters: reduxFilters = [] } = useSelector(state => state.table || {});
  const [filters, setLocalFilters] = useState([]);

  useEffect(() => {
    setLocalFilters(reduxFilters);
  }, [reduxFilters]);

  const handleAddFilter = () => {
    const updated = [...filters, { key: '', condition: 'equals', value: '' }];
    setLocalFilters(updated);
    dispatch(setFilters(updated));
  };

  const handleFilterChange = (index, field, value) => {
    const updated = filters.map((filter, i) =>
      i === index ? { ...filter, [field]: value } : filter
    );
    setLocalFilters(updated);
    dispatch(setFilters(updated));
  };

  const handleRemoveFilter = index => {
    const updated = filters.filter((_, i) => i !== index);
    setLocalFilters(updated);
    dispatch(setFilters(updated));
  };

  if (!columns.length) {
    return <div>Loading filters...</div>;
  }

  return (
    <div className="filter-panel" style={{ marginBottom: '2rem' }}>
      <h3>Filters</h3>
      {filters.map((filter, index) => {
        const selectedColumn = columns.find(c => c.key === filter.key);
        const inputType = selectedColumn?.type === 'options' ? 'text' : selectedColumn?.type ?? 'text';
        return (
          <div key={index} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
            <select
              value={filter.key}
              onChange={e => handleFilterChange(index, 'key', e.target.value)}
            >
              <option value="">Select Column</option>
              {columns.map(col => (
                <option key={col.key} value={col.key}>{col.displayName}</option>
              ))}
            </select>

            <select
              value={filter.condition}
              onChange={e => handleFilterChange(index, 'condition', e.target.value)}
            >
              <option value="equals">Equals</option>
              <option value="contains">Contains</option>
              <option value="greaterThan">Greater Than</option>
              <option value="lessThan">Less Than</option>
            </select>

            <input
              type={inputType}
              value={filter.value ?? ""}
              onChange={e => handleFilterChange(index, 'value', e.target.value)}
            />

            <button
              onClick={() => handleRemoveFilter(index)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#dc3545',
                cursor: 'pointer'
              }}
              title="Remove filter"
            >
              <FaTrash />
            </button>
          </div>
        )
      })}

      <button onClick={handleAddFilter} style={{
        padding: '6px 12px',
        background: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginTop: '0.5rem'
      }}>
        <FaPlus />
        Add Filter
      </button>
    </div>
  );
}

export default FilterPanel;
