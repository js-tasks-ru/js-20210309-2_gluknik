import fetchJson from './utils/fetch-json.js';

const BACKEND_URL = 'https://course-js.javascript.ru';
const PRODUCTS_TO_SHOW = 30;

export default class SortableTable {
  element;
  subElements = {};
  loading = false;

  onClickSort = (event) => {
    const column = event.target.closest('[data-sortable="true"]');

    const toggleOrder = order => {
      const orders = {
        asc: 'desc',
        desc: 'asc'
      };

      return orders[order];
    };

    if (column) {
      let { id, order } = column.dataset;

      order = order ? order : 'asc';
      column.dataset.order = toggleOrder(order);
      if (this.isSortLocally) {
        this.sortOnClient(id, order);
      } else {
        this.sortOnServer(id, order);
      }
    }
  }

  onScrollLoad = () => {
    const offset = 1;
    let windowRelativeBottom = document.documentElement.getBoundingClientRect().bottom;

    if (windowRelativeBottom < document.documentElement.clientHeight + offset && !this.loading && !this.isSortLocally) {
      this.loading = true;
      this.loadMoreData(this.url);
      this.loading = false;
    }    
  }

  constructor(headersConfig, {
    url = [],
    sorted = {},
    isSortLocally = false
  } = {}) {
    this.headersConfig = headersConfig;
    this.url = new URL(url, BACKEND_URL);
    this.sorted = sorted;
    this.start = 0;
    this.end = PRODUCTS_TO_SHOW;
    this.isSortLocally = isSortLocally;
    
    this.render();
    this.loadData(this.url);
  }

  async loadData (url) {
    url.searchParams.set('_start', 0);
    url.searchParams.set('_end', this.end);
    this.data = await fetchJson(url);
    this.subElements.body.innerHTML = this.getTableRows(this.data);
    this.initEventListeners();
  }

  async loadMoreData (url) {
    this.start = this.end;
    this.end = this.start + PRODUCTS_TO_SHOW;
    url.searchParams.set('_start', this.start);
    url.searchParams.set('_end', this.end);
    this.data = await fetchJson(url);
    this.subElements.body.innerHTML += this.getTableRows(this.data);
  }

  getTableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">
      ${this.headersConfig.map(item => this.getHeaderRow(item)).join('')}
    </div>`;
  }

  getHeaderRow({id, title, sortable}) {
    return `
      <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}">
        <span>${title}</span>
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>
      </div>
    `;
  }

  getTableBody() {
    return `
      <div data-element="body" class="sortable-table__body">
        ${this.getTableRows(this.data)}
      </div>`;
  }

  getTableRows(data = []) {
    return data.map(item => {
      return `
        <a href="/products/${item.id}" class="sortable-table__row">
          ${this.getTableRow(item)}
        </a>`;
    }).join('');
  }

  getTableRow(item) {
    const cells = this.headersConfig.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  getTable() {
    return `
      <div class="sortable-table">
        ${this.getTableHeader()}
        ${this.getTableBody()}
      </div>`;
  }

  render() {
    const wrapper = document.createElement('div');

    wrapper.innerHTML = this.getTable();

    const element = wrapper.firstElementChild;

    this.element = element;
    this.subElements = this.getSubElements(element);
  }

  initEventListeners () {
    const sortableTitles = [...this.subElements.header.querySelectorAll('[data-sortable = "true"]')];
    sortableTitles.forEach(item => {
      item.addEventListener('pointerdown', this.onClickSort);
    });

    document.addEventListener('scroll', this.onScrollLoad);
  }

  sortOnClient(id, order) {
    const sortedData = this.sortData(id, order);
    const allColumns = this.element.querySelectorAll('.sortable-table__cell[data-id]');
    const currentColumn = this.element.querySelector(`.sortable-table__cell[data-id="${field}"]`);

    // NOTE: Remove sorting arrow from other columns
    allColumns.forEach(column => {
      column.dataset.order = '';
    });

    currentColumn.dataset.order = order;

    this.subElements.body.innerHTML = this.getTableRows(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.headersConfig.find(item => item.id === field);
    const { sortType } = column;
    const directions = {
      asc: 1,
      desc: - 1
    };
    const direction = directions[order];

    return arr.sort((a, b) => {
      switch (sortType) {
      case 'number':
        return direction * (a[field] - b[field]);
      case 'string':
        return direction * a[field].localeCompare(b[field], ['ru', 'en']);
      default:
        return direction * (a[field] - b[field]);
      }
    });
  }


  sortOnServer (id, order) {
    const url = this.url;
    url.searchParams.set('_sort', id);
    url.searchParams.set('_order', order);

    if (this.end > PRODUCTS_TO_SHOW) {
      this.end = PRODUCTS_TO_SHOW;
    }

    this.loadData(url);
  }

  getSubElements(element) {
    const result = {};
    const elements = element.querySelectorAll('[data-element]');

    for (const subElement of elements) {
      const name = subElement.dataset.element;

      result[name] = subElement;
    }

    return result;
  }

  destroy() {
    this.element.remove();
    this.subElements = {};
    document.removeEventListener('scroll', this.onScrollLoad);
  }
}

