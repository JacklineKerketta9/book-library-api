import { addItem, markItemAsRead, deleteItem } from '../models/books.models.js'

export const addBook = bookToAdd => {
    try {
        return addItem(bookToAdd)
    } catch (err) {
        return err
    }
}

export const markBookAsRead = id => {
    try {
        return markItemAsRead(id)
    } catch (err) {
        return err
    }
}

export const deleteBook = id => {
    try {
        return deleteItem(id)
    } catch (err) {
        return err
    }
}
