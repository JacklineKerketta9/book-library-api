import { useParams, useNavigate, Link } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client/react'
import { GET_BOOK, GET_BOOKS } from '../api/queries'
import { MARK_BOOK_AS_READ, DELETE_BOOK } from '../api/mutations'
import { genreColorIndex } from '../utils/genreColor'

function BookDetail() {
    const { bookId } = useParams()
    const navigate = useNavigate()

    const { loading, error, data } = useQuery(GET_BOOK, { variables: { bookId } })
    const [markBookAsRead, { loading: marking }] = useMutation(MARK_BOOK_AS_READ)
    const [deleteBook, { loading: deleting }] = useMutation(DELETE_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
    })

    if (loading) return <p className='status-text'>Loading...</p>
    if (error) return <p className='status-text error'>Error loading book: {error.message}</p>

    const book = data.book

    const handleDelete = async () => {
        if (!window.confirm(`Delete "${book.title}"? This can't be undone.`)) return
        await deleteBook({ variables: { bookId } })
        navigate('/')
    }

    return (
        <div className='book-detail'>
            <Link to='/' className='back-link'>
                &larr; Back to list
            </Link>

            <div className='detail-card'>
                <div className={`cover large tag-${genreColorIndex(book.genre)}`}>
                    {book.title.charAt(0).toUpperCase()}
                </div>
                <div className='detail-info'>
                    <h2>{book.title}</h2>
                    <p className='author'>{book.author}</p>
                    <div className='detail-meta'>
                        <span className={`tag tag-${genreColorIndex(book.genre)}`}>{book.genre}</span>
                        <span className={book.read ? 'badge read' : 'badge unread'}>
                            {book.read ? '✓ Read' : '○ Unread'}
                        </span>
                    </div>

                    <div className='actions'>
                        {!book.read && (
                            <button onClick={() => markBookAsRead({ variables: { bookId } })} disabled={marking}>
                                {marking ? 'Marking...' : 'Mark as read'}
                            </button>
                        )}
                        <button onClick={handleDelete} disabled={deleting} className='danger'>
                            {deleting ? 'Deleting...' : 'Delete'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetail
