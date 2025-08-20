import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addBook } from '../store/bookSlice.js'
import { categories } from '../data/dummyBooks'

const AddBook = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: 'fiction',
    description: '',
    rating: '',
    publishYear: '',
    pages: '',
    isbn: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.author.trim()) {
      newErrors.author = 'Author is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description must be at least 50 characters long'
    }

    if (!formData.rating) {
      newErrors.rating = 'Rating is required'
    } else if (parseFloat(formData.rating) < 0 || parseFloat(formData.rating) > 5) {
      newErrors.rating = 'Rating must be between 0 and 5'
    }

    if (!formData.publishYear) {
      newErrors.publishYear = 'Publication year is required'
    } else {
      const year = parseInt(formData.publishYear)
      const currentYear = new Date().getFullYear()
      if (year < 1000 || year > currentYear) {
        newErrors.publishYear = `Year must be between 1000 and ${currentYear}`
      }
    }

    if (!formData.pages) {
      newErrors.pages = 'Number of pages is required'
    } else if (parseInt(formData.pages) < 1) {
      newErrors.pages = 'Pages must be at least 1'
    }

    if (!formData.isbn.trim()) {
      newErrors.isbn = 'ISBN is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))

      const bookData = {
        ...formData,
        rating: parseFloat(formData.rating),
        publishYear: parseInt(formData.publishYear),
        pages: parseInt(formData.pages)
      }

      dispatch(addBook(bookData))
      
      // Show success and redirect
      navigate('/books', { 
        state: { 
          message: 'Book added successfully!',
          newBookTitle: formData.title
        }
      })
    } catch (error) {
      console.error('Error adding book:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const categoriesForForm = categories.filter(cat => cat.value !== 'all')

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">➕ Add New Book</h1>
        <p className="text-gray-600">Fill in the details to add a new book to the library.</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Book Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter book title"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title}</p>
            )}
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Author *
            </label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                errors.author ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter author name"
            />
            {errors.author && (
              <p className="mt-1 text-sm text-red-600">{errors.author}</p>
            )}
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200"
            >
              {categoriesForForm.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description * (minimum 50 characters)
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 resize-vertical ${
                errors.description ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter a detailed description of the book..."
            />
            <div className="flex justify-between mt-1">
              {errors.description && (
                <p className="text-sm text-red-600">{errors.description}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.description.length} characters
              </p>
            </div>
          </div>

          {/* Rating and Year Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating * (0.0 - 5.0)
              </label>
              <input
                type="number"
                id="rating"
                name="rating"
                min="0"
                max="5"
                step="0.1"
                value={formData.rating}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.rating ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="4.5"
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>

            <div>
              <label htmlFor="publishYear" className="block text-sm font-medium text-gray-700 mb-2">
                Publication Year *
              </label>
              <input
                type="number"
                id="publishYear"
                name="publishYear"
                min="1000"
                max={new Date().getFullYear()}
                value={formData.publishYear}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.publishYear ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="2023"
              />
              {errors.publishYear && (
                <p className="mt-1 text-sm text-red-600">{errors.publishYear}</p>
              )}
            </div>
          </div>

          {/* Pages and ISBN Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="pages" className="block text-sm font-medium text-gray-700 mb-2">
                Number of Pages *
              </label>
              <input
                type="number"
                id="pages"
                name="pages"
                min="1"
                value={formData.pages}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.pages ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="300"
              />
              {errors.pages && (
                <p className="mt-1 text-sm text-red-600">{errors.pages}</p>
              )}
            </div>

            <div>
              <label htmlFor="isbn" className="block text-sm font-medium text-gray-700 mb-2">
                ISBN *
              </label>
              <input
                type="text"
                id="isbn"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 ${
                  errors.isbn ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="978-0123456789"
              />
              {errors.isbn && (
                <p className="mt-1 text-sm text-red-600">{errors.isbn}</p>
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`flex-1 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none btn-hover flex items-center justify-center space-x-2 ${
                isSubmitting ? 'cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="spinner"></div>
                  <span>Adding Book...</span>
                </>
              ) : (
                <>
                  <span>📚</span>
                  <span>Add Book to Library</span>
                </>
              )}
            </button>
            
            <button
              type="button"
              onClick={() => navigate('/books')}
              disabled={isSubmitting}
              className="flex-1 sm:flex-none bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 disabled:bg-gray-100 disabled:text-gray-400 font-medium py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 hover:shadow-lg disabled:transform-none disabled:shadow-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <div className="flex items-start space-x-3">
          <div className="text-blue-500 text-xl">💡</div>
          <div>
            <h3 className="text-blue-800 font-semibold mb-2">Tips for adding a great book:</h3>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Make sure the title and author are spelled correctly</li>
              <li>• Write a compelling description that makes people want to read the book</li>
              <li>• Choose the most appropriate category for better discoverability</li>
              <li>• Double-check the publication year and page count for accuracy</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddBook