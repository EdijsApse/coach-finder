const escape = require('escape-regexp');
const Coach = require('../models/Coach')

class CoachesDataProvider  {

  query = {};
  model = null;
  options = {}

  filter = {};
  searchOptions = {};

  pageSize = 10;
  currentPage = 1;

  models = [];
  total = 0;

  constructor(query, options) {
    this.query = query;
    this.model = Coach;
    this.options = options;
    
    this.setFilterParams();
    this.setOptionParams();

    this.buildFilter();
    this.buildOptions();
  }

  isValidFilter(filter) {
    return filter && filter.trim();
  }

  setFilterParams() {
    const { q, location, name } = this.query;

    if (this.isValidFilter(q)) {
      this.q = escape(q.trim());
    }

    if (this.isValidFilter(location)) {
      this.location = escape(location.trim());
    }

    if (this.isValidFilter(name)) {
      this.name = escape(name.trim());
    }
  }

  setOptionParams() {
    const { pageSize, currentPage } = this.options;

    if (pageSize) {
      this.pageSize = pageSize;
    }

    if (currentPage && !isNaN(currentPage)) {
      this.currentPage = +currentPage;
    }

  }

  buildOptions() {
    this.searchOptions.limit = this.pageSize;
    this.searchOptions.skip = this.currentPage > 1 ? (this.currentPage * this.pageSize) - this.pageSize : 0;
  }

  buildFilter() {
    const filters = [];

    if (this.q) {
      const conditionFilter = {
        '$or': []
      };

      conditionFilter['$or'].push({ fields : { '$elemMatch': { '$regex': this.q, '$options': 'i' } } });
      conditionFilter['$or'].push({ jobtitle: { '$regex': this.q, '$options': 'i' } });

      filters.push(conditionFilter);
    }

    if (this.location) {
      filters.push({ location: { '$regex': this.location, '$options': 'i' } });
    }

    if (this.name) {
      filters.push({ 'user.name': { '$regex': this.name, '$options': 'i' } });
    }

    if (filters.length !== 0) {
      this.filter['$and'] = filters;
    }

  }

  async search() {
    this.models = await this.model.find(this.filter, {}, this.searchOptions).sort({ created_at: -1 });
    this.total = await this.model.countDocuments(this.filter);
  }

  getTotalPages() {
    return this.total === 0 ? this.total : Math.ceil(this.total / this.pageSize);
  }

  getApiData() {
    return {
      models: this.models.map(model => model.getApiData()),
      meta: {
        pageSize: this.pageSize,
        page: this.currentPage,
        total: this.total,
        pages: this.getTotalPages()
      }
    }
  }
}

module.exports = CoachesDataProvider;