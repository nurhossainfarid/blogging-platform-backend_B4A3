import { FilterQuery, Query } from 'mongoose'

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>
  public query: Record<string, unknown>

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery
    this.query = query
  }

  search(searchFields: string[]) {
    const searchTerm = this.query.search as string
    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i')

      this.modelQuery = this.modelQuery.find({
        $or: searchFields
          .filter((field) => typeof field === 'string' || 'number')
          .map((field) => ({ [field]: regex })),
      } as FilterQuery<T>)
    }
    return this
  }

  filter() {
    const queryObj = { ...this.query }

    const excludedFields = [
      'search',
      'sortBy',
      'sortOrder',
      'limit',
      'page',
      'fields',
    ]
    excludedFields.forEach((el) => delete queryObj[el])

    if (queryObj.filter) {
      queryObj.author = queryObj.filter
      delete queryObj.filter
    }

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>)
    return this
  }

  sort() {
    const sortBy = this.query.sortBy as string
    const sortOrder = this.query.sortOrder === 'asc' ? '' : '-'

    if (sortBy) {
      this.modelQuery = this.modelQuery.sort(`${sortOrder}${sortBy}`)
    } else {
      this.modelQuery = this.modelQuery.sort('-createdAt')
    }
    return this
  }

  pagination() {
    const page = Number(this.query.page) || 1
    const limit = Number(this.query.limit) || 10
    const skip = (page - 1) * limit

    this.modelQuery = this.modelQuery.skip(skip).limit(limit)
    return this
  }

  fields() {
    const fields = this.query.fields
      ? (this.query.fields as string).split(',').join(' ')
      : '-__v'

    this.modelQuery = this.modelQuery.select(fields)
    return this
  }
}

export default QueryBuilder
