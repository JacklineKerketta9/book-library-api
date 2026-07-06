import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useMutation } from '@apollo/client/react'
import { ADD_BOOK } from '../api/mutations'
import { GET_BOOKS } from '../api/queries'

function AddBook() {
    const navigate = useNavigate()
    const [form, setForm] = useState({ title: '', author: '', genre: '', read: false })

    const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
        refetchQueries: [{ query: GET_BOOKS }],
    })

    const handleChange = e => {
        const { name, value, type, checked } = e.target
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        await addBook({ variables: { bookToAdd: form } })
        navigate('/')
    }

    return (
        <div className='add-book'>
            <Link to='/' className='back-link'>
                &larr; Back to list
            </Link>

            <div className='detail-card form-card'>
                <h2>Add a book</h2>
                <form className='book-form' onSubmit={handleSubmit}>
                    <label className='field'>
                        <span>Title</span>
                        <input name='title' value={form.title} onChange={handleChange} required />
                    </label>
                    <label className='field'>
                        <span>Author</span>
                        <input name='author' value={form.author} onChange={handleChange} required />
                    </label>
                    <label className='field'>
                        <span>Genre</span>
                        <input name='genre' value={form.genre} onChange={handleChange} required />
                    </label>
                    <label className='checkbox-field'>
                        <input type='checkbox' name='read' checked={form.read} onChange={handleChange} />
                        Already read
                    </label>
                    <button type='submit' className='primary' disabled={loading}>
                        {loading ? 'Adding...' : 'Add book'}
                    </button>
                </form>
                {error && <p className='status-text error'>Error adding book: {error.message}</p>}
            </div>
        </div>
    )
}

export default AddBook
