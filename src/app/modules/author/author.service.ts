import QueryBuilder from '../../builder/QueryBuilder'
import { authorSearchTerm } from './author.constant'
import { Author } from './author.model'

const getAllAuthorsFromDB = async (query: Record<string, unknown>) => {
  const authorQuery = new QueryBuilder(Author.find(), query)
    .search(authorSearchTerm)
    .filter()
    .sort()
    .pagination()
    .fields()

  const result = await authorQuery.modelQuery
  return result
}

const getSingleAuthorFromDB = async (id: string) => {
  const result = await Author.findById(id).populate('Blogs')
  return result
}

const deleteAuthorFromDB = async (id: string) => {
  const result = await Author.updateOne({ id }, { isDeleted: true })
  return result
}

export const AuthorServices = {
  getAllAuthorsFromDB,
  getSingleAuthorFromDB,
  deleteAuthorFromDB,
}
