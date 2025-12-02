document.addEventListener('DOMContentLoaded', () => {
  const productsColumn = document.querySelector('.col-md-10');
  if (!productsColumn) return;

  const products = Array.from(productsColumn.querySelectorAll('.product'));
  const originalOrder = products.slice();

  const newRow = document.createElement('div');
  newRow.className = 'row mt-2';

  const existingRows = Array.from(productsColumn.querySelectorAll(':scope > .row'));
  existingRows.forEach(r => r.remove());

  originalOrder.forEach(p => newRow.appendChild(p));
  productsColumn.appendChild(newRow);

  function renderOrder(orderArray) {
    orderArray.forEach(p => newRow.appendChild(p));
  }

  function applySort(type) {
    const currentProducts = Array.from(newRow.querySelectorAll('.product'));

    if (type === 'low') {
      currentProducts.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (type === 'high') {
      currentProducts.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else if (type === 'rec') {
      renderOrder(originalOrder);
      return;
    }

    renderOrder(currentProducts);
  }

  function updateActiveSort(type) {
    const listItems = document.querySelectorAll('.list li');
    listItems.forEach(li => li.classList.remove('sort-active'));

    if (type === 'low') listItems[0].classList.add('sort-active');
    else if (type === 'high') listItems[1].classList.add('sort-active');
    else if (type === 'rec') listItems[2].classList.add('sort-active');
  }

  window.sortProducts = function(type) {
    sessionStorage.setItem("lastSortClicked", type);
    applySort(type);
    updateActiveSort(type);
  };

  const navType = performance.getEntriesByType("navigation")[0].type;
  const referrer = document.referrer.toLowerCase();
  const lastClicked = sessionStorage.getItem("lastSortClicked");

  if (navType === "reload") {
    applySort('rec');
    updateActiveSort('rec');
    sessionStorage.removeItem("lastSortClicked");
  } else if (referrer.includes("product") && lastClicked) {
    applySort(lastClicked);
    updateActiveSort(lastClicked);
  } else {
    applySort('rec');
    updateActiveSort('rec');
    sessionStorage.removeItem("lastSortClicked");
  }
});
