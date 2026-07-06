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
        <div>
            <Link to='/'>&larr; Back to list</Link>
            <h2>Add a book</h2>
            <form onSubmit={handleSubmit}>
                <input name='title' placeholder='Title' value={form.title} onChange={handleChange} required />
                <input name='author' placeholder='Author' value={form.author} onChange={handleChange} required />
                <input name='genre' placeholder='Genre' value={form.genre} onChange={handleChange} required />
                <label>
                    <input type='checkbox' name='read' checked={form.read} onChange={handleChange} />
                    Already read
                </label>
                <button type='submit' disabled={loading}>
                    {loading ? 'Adding...' : 'Add book'}
                </button>
            </form>
            {error && <p>Error adding book: {error.message}</p>}
        </div>
    )
}

export default AddBook
