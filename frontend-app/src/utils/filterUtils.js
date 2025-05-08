export const applyFilters = (data, filters) => {
  return filters.reduce((filteredData, filter) => {
    if (filter.key && filter.condition && filter.value) {
      return filteredData.filter((row) => {
        const cellValue = row[filter.key]?.toString().toLowerCase();
        const filterValue = filter.value.toLowerCase();

        switch (filter.condition) {
          case 'equals':
            return cellValue === filterValue;
          case 'contains':
            return cellValue?.includes(filterValue);
          case 'greaterThan':
            return parseFloat(cellValue) > parseFloat(filterValue);
          case 'lessThan':
            return parseFloat(cellValue) < parseFloat(filterValue);
          default:
            return true;
        }
      });
    }
    return filteredData;
  }, data);
};
