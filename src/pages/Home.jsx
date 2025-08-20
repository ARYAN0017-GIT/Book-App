import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectPopularBooks } from '../store/bookSlice.js'
import { categories } from '../data/dummyBooks'
import BookCard from '../components/BookCard'

const Home = () => {
  const popularBooks = useSelector(selectPopularBooks)

  return (
    
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="text-center mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Welcome to <span className="text-primary-600">BookHaven</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover your next favorite book in our vast digital library. From fiction to non-fiction, 
            we have something for every reader.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/books"
              className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg btn-hover"
            >
              Browse All Books 📖
            </Link>
            <Link
              to="/add-book"
              className="bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg btn-hover"
            >
              Add New Book ➕
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="mb-16">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.filter(cat => cat.value !== 'all').map((category) => (
              <Link
                key={category.value}
                to={`/books/${category.value}`}
                className="bg-gradient-to-br from-blue-50 to-indigo-100 hover:from-primary-100 hover:to-primary-200 border border-gray-200 rounded-xl p-6 text-center transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg card-hover group"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-200">
                  {category.icon}
                </div>
                <h3 className="font-semibold text-gray-800 group-hover:text-primary-700 transition-colors duration-200">
                  {category.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Books Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            🔥 Popular Books
          </h2>
          <Link
            to="/books"
            className="text-primary-600 hover:text-primary-700 font-medium flex items-center space-x-1 transition-colors duration-200"
          >
            <span>View All</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {popularBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBooks.slice(0, 6).map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-gray-600 text-lg">No popular books found.</p>
          </div>
        )}
      </section>

      {/* Statistics Section */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl shadow-lg p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Library Statistics</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">20+</div>
              <div className="text-primary-100">Books Available</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">6</div>
              <div className="text-primary-100">Categories</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.5★</div>
              <div className="text-primary-100">Average Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home