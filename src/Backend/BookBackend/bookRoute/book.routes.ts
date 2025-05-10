import { Router, Request, Response } from 'express'
import { createBook } from '../bookController/book.controllers'
import { authenticateToken, checkPermissions, checkBookEditPermissions, checkBookDeletePermissions} from '../../../middleware/auth'
import { readBook, readBooks } from '../bookController/book.controllers'
import { updateBook } from '../bookController/book.controllers'
import { disableBook } from '../bookController/book.controllers'
const bookRoutes = Router()


async function CreateBook(request: Request, response: Response) {
  if (!request.body.title || !request.body.author || !request.body.genre || !request.body.publishedDate) {
    return response.status(400).json({ message: 'Missing fields' })
  }

  try {
    const newBook = await createBook(request.body)
    response.status(201).json({ message: 'Book created successfully', book: newBook })
  } catch (error) {
    response.status(500).json({ message: 'Failed to create book', error })
  }
}

async function GetBooks(request: Request, response: Response) {
  const { bookId } = request.params
  const filters = request.query

  try {
    if (bookId) {
      // Búsqueda de un solo libro por ID
      const book = await readBook(bookId)
      if (!book) {
        return response.status(404).json({ message: "Book not found" })
      }
      return response.status(200).json({ book })
    }

    // Búsqueda de libros con filtros
    const books = await readBooks(filters)
    response.status(200).json({ books })
  } catch (error) {
    response.status(500).json({ message: "Error retrieving books", error })
  }
}
async function UpdateBook(request: Request, response: Response) {
  const { bookId } = request.params
  const updateData = request.body

  try {
    const updatedBook = await updateBook(bookId, updateData)
    if (!updatedBook) {
      return response.status(404).json({ message: 'Book not found' })
    }

    response.status(200).json({ message: 'Book updated successfully', book: updatedBook })
  } catch (error) {
    response.status(500).json({ message: 'Failed to update book', error })
  }
}
async function DisableBook(request: Request, response: Response) {
  const { bookId } = request.params

  try {
    const disabledBook = await disableBook(bookId)
    if (!disabledBook) {
      return response.status(404).json({ message: 'Book not found' })
    }

    response.status(200).json({ message: 'Book disabled successfully', book: disabledBook })
  } catch (error) {
    response.status(500).json({ message: 'Failed to disable book', error })
  }
}

// Ruta protegida para crear libros
bookRoutes.post('/', authenticateToken, checkPermissions('canCreate'), async (request: Request, response: Response) => {
  try {
    const newBook = await createBook(request.body)
    response.status(201).json({ message: 'Book created successfully', book: newBook })
  } catch (error) {
    response.status(500).json({ message: 'Failed to create book', error })
  }
})

bookRoutes.get('/:bookId?', GetBooks) // Búsqueda de un libro específico o con filtros
bookRoutes.put('/update/:bookId', authenticateToken, checkBookEditPermissions, UpdateBook)//update books
bookRoutes.put('/disable/:bookId', authenticateToken, checkBookDeletePermissions, DisableBook)//disable books

export default bookRoutes
