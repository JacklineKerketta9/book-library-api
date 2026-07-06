import { gql } from '@apollo/client'

export const ADD_BOOK = gql`
    mutation AddBook($bookToAdd: BookToAdd!) {
        addBook(bookToAdd: $bookToAdd) {
            id
            title
            author
            genre
            read
        }
    }
`

export const MARK_BOOK_AS_READ = gql`
    mutation MarkBookAsRead($bookId: ID!) {
        markBookAsRead(id: $bookId) {
            id
            read
        }
    }
`

export const DELETE_BOOK = gql`
    mutation DeleteBook($bookId: ID!) {
        deleteBook(id: $bookId) {
            id
        }
    }
`
