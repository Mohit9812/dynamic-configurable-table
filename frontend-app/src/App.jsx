import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {
  setColumns,
  setData,
  setVisibleColumns,
  setFilters
} from './redux/tableSlice.js';
import Table from './components/Table.jsx';
import ColumnToggler from './components/ColumnToggler.jsx';
import FilterPanel from './components/FilterPanel.jsx';
import ShareLinkButton from './components/ShareButton.jsx';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const { visibleColumns = [], filters = [] } = useSelector((state) => state.table || {});
  const [initialized, setInitialized] = useState(false); // ✅ initialization state

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const columnsRes = await fetch('/data/column-configuration.json');
        const columns = await columnsRes.json();
        dispatch(setColumns(columns));

        const dataRes = await fetch('/data/data.json');
        const data = await dataRes.json();
        dispatch(setData(data));

        const visibleColumnsParam = searchParams.get('visible');
        const filtersParam = searchParams.get('filters');

        if (visibleColumnsParam) {
          const visibleArray = visibleColumnsParam.split(',').map(col => col.trim());
          dispatch(setVisibleColumns(visibleArray));
        }

        if (filtersParam) {
          try {
            const parsedFilters = JSON.parse(decodeURIComponent(filtersParam));
            dispatch(setFilters(parsedFilters));
          } catch {
            console.error('Error parsing filters:', filtersParam);
          }
        }

        setInitialized(true);
      } catch (error) {
        console.error('Error fetching configuration or data:', error);
      }
    };

    fetchConfig();
  }, [dispatch, searchParams]);

  useEffect(() => {
    if (!initialized) return;

    const params = {
      visible: visibleColumns.join(','),
      filters: encodeURIComponent(JSON.stringify(filters)),
    };

    setSearchParams(params, { replace: true });
  }, [visibleColumns, filters, setSearchParams, initialized]);

  return (
    <div className="app-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h1>Dynamic Configurable Table</h1>
        <ShareLinkButton />
      </div>
      <ColumnToggler />
      <FilterPanel />
      <Table />
    </div>
  );
}

export default App;
