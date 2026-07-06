import { getItem, listItems, listItemsByGenre } from '../models/books.models.js'

export const getBook = id => {
    try {
        return getItem(id)
    } catch (err) {
        return err
    }
}

export const listBooks = () => {
    try {
        return listItems()
    } catch (err) {
        return err
    }
}

export const booksByGenre = genre => {
    try {
        return listItemsByGenre(genre)
    } catch (err) {
        return err
    }
}
