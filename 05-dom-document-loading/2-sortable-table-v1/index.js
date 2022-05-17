export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.productsContainer(this.data);
  }

  sort(fieldValue, orderValue) {
    const newData = [...this.data];

    const headerConfigObj = this.headerConfig.find(item => item.id === fieldValue);

    if (headerConfigObj.sortType === "string") {
      newData.sort((a, b) => a[fieldValue].localeCompare(b[fieldValue], ["ru", "en"]));
    } else if (headerConfigObj.sortType === "number") {
      newData.sort((a, b) => a[fieldValue] - b[fieldValue]);
    }

    if (orderValue === "desc") {
      newData.reverse();
    }

    this.productsContainerAdd(newData);

    const header = this.element.querySelector(`[data-id=${fieldValue}]`);
    header.setAttribute("data-order", orderValue);
    header.insertAdjacentHTML("beforeend", `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `);
  }

  destroy() {
    return this.element.remove();
  }

  productsContainer(data) {
    const div = document.createElement("div");
    div.innerHTML = `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">

          <div data-element="header" class="sortable-table__header sortable-table__row">
          </div>

          <div data-element="body" class="sortable-table__body">
          </div>

          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>

        </div>
      </div>
    `;
    this.element = div.firstElementChild;

    this.productsContainerAdd(data);
  }

  productsContainerAdd(data) {
    const header = this.element.querySelector("[data-element=header]");
    header.innerHTML = ``;

    for (const item of this.headerConfig) {
      header.insertAdjacentHTML("beforeend", `
        <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}">
          <span>${item.title}</span>
        </div>
      `);
    }

    const body = this.element.querySelector("[data-element=body]");
    body.innerHTML = ``;

    for (const itemData of data) {
      body.insertAdjacentHTML("beforeend", `<a href="/products/${itemData.id}" class="sortable-table__row"></a>`);

      for (const itemHeader of this.headerConfig) {
        if (itemHeader.id === "images") {
          body.lastElementChild.insertAdjacentHTML("beforeend",
            itemHeader.template(itemData[itemHeader.id])
          );
        } else {
          body.lastElementChild.insertAdjacentHTML("beforeend", `
            <div class="sortable-table__cell">${itemData[itemHeader.id]}</div>
          `);
        }
      }
    }

    this.subElements = {body};
  }
}

