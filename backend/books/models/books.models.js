import db from '../../db/db.js'

export const getItem = id => {
    try {
        return db?.books?.filter(book => book?.id === parseInt(id))[0]
    } catch (err) {
        console.error('Error', err)
        return err
    }
}

export const listItems = () => {
    try {
        return db?.books
    } catch (err) {
        console.error('Error', err)
        return err
    }
}

export const listItemsByGenre = genre => {
    try {
        return db?.books?.filter(book => book?.genre === genre)
    } catch (err) {
        console.error('Error', err)
        return err
    }
}

export const addItem = data => {
    try {
        const newBook = { id: db.books.length + 1, ...data }
        db.books.push(newBook)
        return newBook
    } catch (err) {
        console.error('Error', err)
        return err
    }
}

export const markItemAsRead = id => {
    try {
        const index = db.books.findIndex(book => book.id === parseInt(id))
        if (index === -1) throw new Error('Book not found')
        db.books[index].read = true
        return db.books[index]
    } catch (err) {
        console.error('Error', err)
        return err
    }
}

export const deleteItem = id => {
    try {
        const index = db.books.findIndex(book => book.id === parseInt(id))
        if (index === -1) throw new Error('Book not found')
        db.books.splice(index, 1)
        return db.books
    } catch (err) {
        console.error('Error', err)
        return err
    }
}
