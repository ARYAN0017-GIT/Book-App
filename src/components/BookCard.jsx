import { Link } from 'react-router-dom'

const BookCard = ({ book, showCategory = true }) => {
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 card-hover overflow-hidden group">
      {/* Book Cover Placeholder */}
      <div className="h-48 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-center p-4">
            <div className="text-4xl mb-2">📚</div>
            <div className="font-bold text-lg leading-tight">{book.title}</div>
          </div>
        </div>
        {book.isPopular && (
          <div className="absolute top-3 right-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
            🔥 Popular
          </div>
        )}
      </div>

      {/* Book Details */}
      <div className="p-5">
        {/* Category Badge */}
        {showCategory && (
          <div className="mb-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(book.category)}`}>
              {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
            </span>
          </div>
        )}

        {/* Title and Author */}
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2 mb-1">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 font-medium">by {book.author}</p>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {book.description}
        </p>

        {/* Rating and Details */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg">{renderStars(book.rating)}</span>
            <span className="text-sm text-gray-600 font-medium">({book.rating})</span>
          </div>
          <div className="text-xs text-gray-500">
            {book.publishYear} • {book.pages} pages
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/book/${book.id}`}
          className="w-full bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg text-center block btn-hover"
        >
          View Details →
        </Link>
      </div>
    </div>
  )
}

export default BookCard