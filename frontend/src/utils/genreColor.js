const PALETTE_SIZE = 8

export const genreColorIndex = genre => {
    if (!genre) return 0
    let hash = 0
    for (let i = 0; i < genre.length; i++) {
        hash = (hash * 31 + genre.charCodeAt(i)) % PALETTE_SIZE
    }
    return hash
}
