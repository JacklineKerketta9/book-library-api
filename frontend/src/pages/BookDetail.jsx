import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_BOOK, GET_BOOKS } from '../api/queries'
import { MARK_BOOK_AS_READ, DELETE_BOOK } from '../api/mutations'

function BookDetail() {
    const { bookId } = useParams()
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GET_BOOK, { variables: { bookId } })
    const [markBookAsRead] = useMutation(MARK_BOOK_AS_READ)
    const [deleteBook] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error loading book: {error.message}</p>

    const book = data.book

    return (
        <div>
            <Link to='/'>&larr; Back to list</Link>
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Read: {book.read ? 'Yes' : 'No'}</p>

            {!book.read && (
                <button onClick={() => markBookAsRead({ variables: { bookId } })}>
                    Mark as read
                </button>
            )}

            <button
                onClick={async () => {
                    await deleteBook({ variables: { bookId } })
                    navigate('/')
                }}
            >
                Delete
            </button>
        </div>
    )
}

export default BookDetail
