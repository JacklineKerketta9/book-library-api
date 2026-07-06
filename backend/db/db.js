const db = {
    books: [
        { id: 1, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'fantasy', read: true },
        { id: 2, title: "Harry Potter and the Sorcerer's Stone", author: 'J.K. Rowling', genre: 'fantasy', read: true },
        { id: 3, title: 'A Game of Thrones', author: 'George R.R. Martin', genre: 'fantasy', read: false },
        { id: 4, title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'fantasy', read: false },
        { id: 5, title: 'Dune', author: 'Frank Herbert', genre: 'sci-fi', read: false },
        { id: 6, title: 'Neuromancer', author: 'William Gibson', genre: 'sci-fi', read: false },
        { id: 7, title: 'Foundation', author: 'Isaac Asimov', genre: 'sci-fi', read: true },
        { id: 8, title: "Ender's Game", author: 'Orson Scott Card', genre: 'sci-fi', read: true },
        { id: 9, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'non-fiction', read: true },
        { id: 10, title: 'Educated', author: 'Tara Westover', genre: 'non-fiction', read: false },
        { id: 11, title: 'Atomic Habits', author: 'James Clear', genre: 'non-fiction', read: true },
        { id: 12, title: 'And Then There Were None', author: 'Agatha Christie', genre: 'mystery', read: true },
        { id: 13, title: 'The Girl with the Dragon Tattoo', author: 'Stieg Larsson', genre: 'mystery', read: false },
        { id: 14, title: 'Gone Girl', author: 'Gillian Flynn', genre: 'mystery', read: false },
        { id: 15, title: 'Pride and Prejudice', author: 'Jane Austen', genre: 'classic', read: true },
        { id: 16, title: '1984', author: 'George Orwell', genre: 'classic', read: true },
        { id: 17, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'classic', read: false },
        { id: 18, title: 'The Fault in Our Stars', author: 'John Green', genre: 'romance', read: false },
        { id: 19, title: 'Me Before You', author: 'Jojo Moyes', genre: 'romance', read: false },
        { id: 20, title: 'It', author: 'Stephen King', genre: 'horror', read: true },
    ]
}

export default db
