const {
  getData,
  getUniqueSortedProducts,
  categorizeProducts,
  writeFile,
} = require('./util/dataManipulation');

//IIFE (Immediately Invoked Function Expression) when the script runs
(() => {
  const data = getData('data01.json');

  let uniqueSortedProducts = getUniqueSortedProducts(data);

  const categorizedProducts = categorizeProducts(data, uniqueSortedProducts);

  writeFile(categorizedProducts);
})();
