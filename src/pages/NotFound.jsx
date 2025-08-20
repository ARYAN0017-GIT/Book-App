import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center max-w-2xl mx-auto">
        {/* 404 Icon */}
        <div className="text-8xl mb-6">🔍</div>
        
        {/* Error Message */}
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for seems to have vanished into the digital void. 
          Don't worry, our books are still here waiting for you!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <Link
            to="/"
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg btn-hover inline-flex items-center justify-center space-x-2"
          >
            <span>🏠</span>
            <span>Go Home</span>
          </Link>
          
          <Link
            to="/books"
            className="bg-white border-2 border-primary-500 text-primary-600 hover:bg-primary-50 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg btn-hover inline-flex items-center justify-center space-x-2"
          >
            <span>📚</span>
            <span>Browse Books</span>
          </Link>
        </div>

        {/* Fun Facts Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 text-left">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
            📖 Did you know?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong>📊 Fun Fact 1:</strong> The average person reads about 12 books per year!
            </div>
            <div>
              <strong>⏰ Fun Fact 2:</strong> Reading for just 6 minutes can reduce stress levels by up to 68%!
            </div>
            <div>
              <strong>🧠 Fun Fact 3:</strong> Reading fiction can improve empathy and emotional intelligence!
            </div>
            <div>
              <strong>💤 Fun Fact 4:</strong> Reading before bed can improve sleep quality!
            </div>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Navigation</h3>
          <div className="flex flex-wrap justify-center gap-2">
            <Link
              to="/books/fiction"
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200 transition-colors duration-200"
            >
              📖 Fiction
            </Link>
            <Link
              to="/books/sci-fi"
              className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200 transition-colors duration-200"
            >
              🚀 Sci-Fi
            </Link>
            <Link
              to="/books/mystery"
              className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors duration-200"
            >
              🔍 Mystery
            </Link>
            <Link
              to="/books/fantasy"
              className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm hover:bg-indigo-200 transition-colors duration-200"
            >
              🧙‍♂️ Fantasy
            </Link>
            <Link
              to="/add-book"
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-colors duration-200"
            >
              ➕ Add Book
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound