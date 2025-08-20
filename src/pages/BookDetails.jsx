import { useParams, Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectBookById } from '../store/bookSlice.js'

const BookDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const book = useSelector(state => selectBookById(state, id))

  if (!book) {
    return (
      <div className="animate-fade-in">
        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
          <div className="text-6xl mb-4">❓</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Book Not Found</h1>
          <p className="text-gray-600 mb-8">
            The book you're looking for doesn't exist or may have been removed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(-1)}
              className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>
            <Link
              to="/books"
              className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200"
            >
              Browse Books
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐')
    }
    if (hasHalfStar) {
      stars.push('✨')
    }
    
    return stars.join('')
  }

  const getCategoryColor = (category) => {
    const colors = {
      'fiction': 'bg-blue-100 text-blue-800',
      'non-fiction': 'bg-green-100 text-green-800',
      'sci-fi': 'bg-purple-100 text-purple-800',
      'mystery': 'bg-red-100 text-red-800',
      'fantasy': 'bg-indigo-100 text-indigo-800',
      'horror': 'bg-gray-100 text-gray-800',
    }
    return colors[category] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div className="animate-fade-in">
      {/* Back Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow hover:shadow-md"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Back to Browse</span>
        </button>
      </div>

      {/* Book Details Card */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Book Cover */}
          <div className="md:w-1/3">
            <div className="h-96 md:h-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-6">
                  <div className="text-6xl mb-4">📚</div>
                  <div className="font-bold text-2xl leading-tight">{book.title}</div>
                </div>
              </div>
              {book.isPopular && (
                <div className="absolute top-6 right-6 bg-yellow-400 text-yellow-900 px-3 py-2 rounded-full text-sm font-bold">
                  🔥 Popular
                </div>
              )}
            </div>
          </div>

          {/* Book Information */}
          <div className="md:w-2/3 p-8">
            {/* Category Badge */}
            <div className="mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(book.category)}`}>
                {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
              </span>
            </div>

            {/* Title and Author */}
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{book.title}</h1>
            <p className="text-xl text-gray-600 mb-6">by {book.author}</p>

            {/* Rating */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{renderStars(book.rating)}</span>
                <span className="text-lg font-semibold text-gray-700">({book.rating})</span>
              </div>
            </div>

            {/* Book Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">{book.publishYear}</div>
                <div className="text-sm text-gray-600">Published</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary-600">{book.pages}</div>
                <div className="text-sm text-gray-600">Pages</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center col-span-2 md:col-span-1">
                <div className="text-xs font-bold text-primary-600 break-all">{book.isbn}</div>
                <div className="text-sm text-gray-600">ISBN</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">About This Book</h2>
              <p className="text-gray-600 leading-relaxed text-lg">{book.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/books"
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-center btn-hover"
              >
                Browse More Books
              </Link>
              <Link
                to={`/books/${book.category}`}
                className="bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-center btn-hover"
              >
                Similar Books
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Title</h3>
            <p className="text-gray-600">{book.title}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Author</h3>
            <p className="text-gray-600">{book.author}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Category</h3>
            <p className="text-gray-600 capitalize">{book.category}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Rating</h3>
            <p className="text-gray-600">{book.rating} out of 5 stars</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Publication Year</h3>
            <p className="text-gray-600">{book.publishYear}</p>
          </div>
          <div>
            <h3 className="font-semibold text-gray-700 mb-2">Pages</h3>
            <p className="text-gray-600">{book.pages} pages</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookDetails