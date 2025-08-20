import { createSlice } from '@reduxjs/toolkit'
import { dummyBooks } from '../data/dummyBooks'

const initialState = {
  books: [...dummyBooks],
  loading: false,
  error: null,
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    addBook: (state, action) => {
      const newBook = {
        ...action.payload,
        id: Math.max(...state.books.map(book => book.id)) + 1,
        isPopular: false, // New books start as not popular
      }
      state.books.push(newBook)
    },
    updateBook: (state, action) => {
      const index = state.books.findIndex(book => book.id === action.payload.id)
      if (index !== -1) {
        state.books[index] = { ...state.books[index], ...action.payload }
      }
    },
    deleteBook: (state, action) => {
      state.books = state.books.filter(book => book.id !== action.payload)
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    toggleBookmark: (state, action) => {
      const book = state.books.find(book => book.id === action.payload)
      if (book) {
        book.isBookmarked = !book.isBookmarked
      }
    },
  },
})

export const { 
  addBook, 
  updateBook, 
  deleteBook, 
  setLoading, 
  setError, 
  toggleBookmark 
} = booksSlice.actions

// Selectors
export const selectAllBooks = (state) => state.books.books
export const selectBookById = (state, bookId) => 
  state.books.books.find(book => book.id === parseInt(bookId))
export const selectBooksByCategory = (state, category) => {
  if (category === 'all') return state.books.books
  return state.books.books.filter(book => book.category === category)
}
export const selectPopularBooks = (state) => 
  state.books.books.filter(book => book.isPopular)
export const selectBooksLoading = (state) => state.books.loading
export const selectBooksError = (state) => state.books.error

export default booksSlice.reducer