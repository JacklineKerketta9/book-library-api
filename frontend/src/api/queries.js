import { gql } from '@apollo/client'

export const GET_BOOKS = gql`
    query Books {
        books {
            id
            title
            author
            genre
        }
    }
`

export const GET_BOOK = gql`
    query Book($bookId: ID!) {
        book(id: $bookId) {
            id
            title
            author
            genre
            read
        }
    }
`

export const GET_BOOKS_BY_GENRE = gql`
    query BooksByGenre($genre: String!) {
        booksByGenre(genre: $genre) {
            id
            title
            author
            genre
        }
    }
`
