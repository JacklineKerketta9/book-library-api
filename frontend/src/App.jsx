import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

const BookList = lazy(() => import('./pages/BookList'))
const BookDetail = lazy(() => import('./pages/BookDetail'))
const AddBook = lazy(() => import('./pages/AddBook'))

function App() {
    return (
        <div className='App'>
            <Router>
                <header className='app-header'>
                    <Link to='/' className='brand'>
                        <span className='brand-mark'>📚</span>
                        <span>
                            <h1>Book Library</h1>
                            <p className='tagline'>Your reading, organized.</p>
                        </span>
                    </Link>
                </header>
                <main>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Suspense fallback={<p className='status-text'>Loading...</p>}>
                                    <BookList />
                                </Suspense>
                            }
                        />
                        <Route
                            path='/:bookId'
                            element={
                                <Suspense fallback={<p className='status-text'>Loading...</p>}>
                                    <BookDetail />
                                </Suspense>
                            }
                        />
                        <Route
                            path='/add'
                            element={
                                <Suspense fallback={<p className='status-text'>Loading...</p>}>
                                    <AddBook />
                                </Suspense>
                            }
                        />
                    </Routes>
                </main>
            </Router>
        </div>
    )
}

export default App
