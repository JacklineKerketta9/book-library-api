import { addBook, markBookAsRead, deleteBook } from './mutations/books.mutations.js'
import { listBooks, getBook, booksByGenre } from './queries/books.queries.js'

export const typeDefs = `#graphql
  type Book {
    id: ID!
    title: String!
    author: String!
    genre: String!
    read: Boolean!
  }

  input BookToAdd {
    title: String!
    author: String!
    genre: String!
    read: Boolean
  }

  type Query {
    books: [Book],
    book(id: ID!): Book,
    booksByGenre(genre: String!): [Book]
  }

  type Mutation {
    addBook(bookToAdd: BookToAdd!): Book,
    markBookAsRead(id: ID!): Book,
    deleteBook(id: ID!): [Book],
  }
`

export const resolvers = {
    Query: {
        books: () => listBooks(),
        book: (_, { id }) => getBook(id),
        booksByGenre: (_, { genre }) => booksByGenre(genre)
    },
    Mutation: {
        addBook: (_, { bookToAdd }) => addBook(bookToAdd),
        markBookAsRead: (_, { id }) => markBookAsRead(id),
        deleteBook: (_, { id }) => deleteBook(id)
    }
}
