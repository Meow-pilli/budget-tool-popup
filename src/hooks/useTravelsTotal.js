export default function useTravelsTotal(data, key) {
    return parseFloat(calculateTotal(data, key));
  }
  
  function calculateTotal(data, key) {
    return data
      .reduce((acc, row) => acc + parseFloat(row[key] || 0), 0)
      .toFixed(2);
  }
  