import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAllBooks } from '../store/bookSlice.js'
import { categories } from '../data/dummyBooks'
import BookCard from '../components/BookCard'
import SearchBar from '../components/SearchBar'

const BrowseBooks = () => {
  const { category } = useParams()
  const allBooks = useSelector(selectAllBooks)
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(category || 'all')

  useEffect(() => {
    setSelectedCategory(category || 'all')
  }, [category])

  useEffect(() => {
    let books = allBooks

    // Filter by category
    if (selectedCategory !== 'all') {
      books = books.filter(book => book.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      books = books.filter(book => 
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredBooks(books)
  }, [allBooks, selectedCategory, searchTerm])

  const handleSearch = (term) => {
    setSearchTerm(term)
  }

  const currentCategory = categories.find(cat => cat.value === selectedCategory)

  return (
    <div className="animate-fade-in">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {currentCategory?.icon} {currentCategory?.name || 'All Books'}
            </h1>
            <p className="text-gray-600">
              {filteredBooks.length} book{filteredBooks.length !== 1 ? 's' : ''} found
              {searchTerm && ` for "${searchTerm}"`}
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              to={cat.value === 'all' ? '/books' : `/books/${cat.value}`}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                selectedCategory === cat.value
                  ? 'bg-primary-100 text-primary-700 shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              showCategory={selectedCategory === 'all'} 
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">No Books Found</h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? `No books match your search "${searchTerm}" in this category.`
              : `No books available in the ${currentCategory?.name.toLowerCase()} category yet.`
            }
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Clear Search
              </button>
            )}
            <Link
              to="/add-book"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
            >
              Add a Book
            </Link>
          </div>
        </div>
      )}

      {/* Back to Home */}
      <div className="mt-12 text-center">
        <Link
          to="/"
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  )
}

export default BrowseBooks