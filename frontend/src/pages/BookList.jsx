import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { GET_BOOKS, GET_BOOKS_BY_GENRE } from '../api/queries'

function BookList() {
    const [selectedGenre, setSelectedGenre] = useState('')

    const allBooks = useQuery(GET_BOOKS)
    const filteredBooks = useQuery(GET_BOOKS_BY_GENRE, {
        variables: { genre: selectedGenre },
        skip: !selectedGenre,
    })

    if (allBooks.loading) return <p>Loading...</p>
    if (allBooks.error) return <p>Error loading books: {allBooks.error.message}</p>

    const genres = [...new Set(allBooks.data.books.map(book => book.genre))]
    const books = selectedGenre ? filteredBooks.data?.booksByGenre : allBooks.data.books

    return (
        <div className='book-list'>
            <div className='toolbar'>
                <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
                    <option value=''>All genres</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
                <Link to='/add' className='button'>
                    + Add book
                </Link>
            </div>

            {selectedGenre && filteredBooks.loading && <p>Filtering...</p>}

            <ul>
                {books?.map(book => (
                    <li key={book.id}>
                        <Link to={`/${book.id}`}>
                            <span className='title'>{book.title}</span>
                            <span className='meta'>
                                {book.author} · {book.genre}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>

            {books?.length === 0 && <p>No books in this genre yet.</p>}
        </div>
    )
}

export default BookList
