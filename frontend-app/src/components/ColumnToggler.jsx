import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleColumnVisibility } from '../redux/tableSlice.js';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function ColumnToggler() {
  const dispatch = useDispatch();

  const { columns = [], visibleColumns = [] } = useSelector((state) => state.table || {});

  const handleToggle = (key) => {
    dispatch(toggleColumnVisibility(key));
  };

  if (!columns.length) {
    return <div>Loading column toggler...</div>;
  }

  return (
    <div className="column-toggler" style={{ marginBottom: '1rem' }}>
      <h3 style={{ marginBottom: '0.5rem' }}>🧩 Manage Columns</h3>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '1rem',
        background: '#f8f9fa',
        padding: '10px',
        borderRadius: '6px'
      }}>
        {columns.map(col => {
          const isVisible = visibleColumns.includes(col.key);
          const Icon = isVisible ? FaEye : FaEyeSlash;

          return (
            <div
              key={col.key}
              onClick={() => handleToggle(col.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
                color: isVisible ? '#28a745' : '#6c757d'
              }}
              title={`${isVisible ? 'Hide' : 'Show'} ${col.displayName}`}
            >
              <Icon />
              <span>{col.displayName}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ColumnToggler;
