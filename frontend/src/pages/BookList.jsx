import { Link } from 'react-router-dom'
import { useQuery } from '@apollo/client/react'
import { GET_BOOKS } from '../api/queries'

function BookList() {
    const { loading, error, data } = useQuery(GET_BOOKS)

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading books: {error.message}</p>

    return (
        <div>
            <Link to='/add'>+ Add book</Link>
            <ul>
                {data.books.map(book => (
                    <li key={book.id}>
                        <Link to={`/${book.id}`}>
                            {book.title} — {book.author} ({book.genre})
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList
