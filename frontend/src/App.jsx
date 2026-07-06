import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

const BookList = lazy(() => import('./pages/BookList'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const AddBook = lazy(() => import('./pages/AddBook'))

function App() {
    return (
        <div className='App'>
            <Router>
                <h1>Book Library</h1>
                <Routes>
                    <Route
                        path='/'
                        element={
                            <Suspense fallback={<p>Loading...</p>}>
                                <BookList />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/:bookId'
                        element={
                            <Suspense fallback={<p>Loading...</p>}>
                                <BookDetail />
                            </Suspense>
                        }
                    />
                    <Route
                        path='/add'
                        element={
                            <Suspense fallback={<p>Loading...</p>}>
                                <AddBook />
                            </Suspense>
                        }
                    />
                </Routes>
            </Router>
        </div>
    )
}

export default App
