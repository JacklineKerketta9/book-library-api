import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { GET_BOOKS, GET_BOOKS_BY_GENRE } from '../api/queries'
import { genreColorIndex } from '../utils/genreColor'

function BookCardSkeleton() {
    return (
        <div className='book-card skeleton'>
            <div className='cover skeleton-block' />
            <div className='skeleton-lines'>
                <div className='skeleton-block line' />
                <div className='skeleton-block line short' />
            </div>
        </div>
    )
}

function BookList() {
    const [selectedGenre, setSelectedGenre] = useState('')
    const [search, setSearch] = useState('')

    const allBooks = useQuery(GET_BOOKS)
    const filteredBooks = useQuery(GET_BOOKS_BY_GENRE, {
        variables: { genre: selectedGenre },
        skip: !selectedGenre,
    })

    if (allBooks.error) return <p className='status-text error'>Error loading books: {allBooks.error.message}</p>

    const genres = allBooks.data ? [...new Set(allBooks.data.books.map(book => book.genre))] : []
    const sourceBooks = selectedGenre ? filteredBooks.data?.booksByGenre : allBooks.data?.books
    const isLoading = allBooks.loading || (selectedGenre && filteredBooks.loading)

    const books = (sourceBooks || []).filter(book =>
        book.title.toLowerCase().includes(search.toLowerCase()) ||
        book.author.toLowerCase().includes(search.toLowerCase())
    )

    const readCount = allBooks.data?.books.filter(b => b.read).length ?? 0
    const totalCount = allBooks.data?.books.length ?? 0

    return (
        <div className='book-list'>
            <div className='toolbar'>
                <input
                    className='search'
                    type='text'
                    placeholder='Search title or author...'
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <select value={selectedGenre} onChange={e => setSelectedGenre(e.target.value)}>
                    <option value=''>All genres</option>
                    {genres.map(genre => (
                        <option key={genre} value={genre}>
                            {genre}
                        </option>
                    ))}
                </select>
                <Link to='/add' className='button primary'>
                    + Add book
                </Link>
            </div>

            {!isLoading && (
                <p className='stats'>
                    {totalCount} books · {readCount} read · {totalCount - readCount} unread
                </p>
            )}

            <div className='book-grid'>
                {isLoading &&
                    Array.from({ length: 6 }).map((_, i) => <BookCardSkeleton key={i} />)}

                {!isLoading &&
                    books.map(book => (
                        <Link to={`/${book.id}`} key={book.id} className='book-card'>
                            <div className={`cover tag-${genreColorIndex(book.genre)}`}>
                                {book.title.charAt(0).toUpperCase()}
                            </div>
                            <div className='book-card-body'>
                                <span className='title'>{book.title}</span>
                                <span className='author'>{book.author}</span>
                                <span className={`tag tag-${genreColorIndex(book.genre)}`}>{book.genre}</span>
                            </div>
                        </Link>
                    ))}
            </div>

            {!isLoading && books.length === 0 && (
                <p className='status-text'>No books match your search.</p>
            )}
        </div>
    )
}

export default BookList
