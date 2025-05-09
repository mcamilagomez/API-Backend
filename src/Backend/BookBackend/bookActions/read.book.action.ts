import { BookModel, BookType } from "../bookModel/book.model"

// Función para obtener un libro por ID
export const getBookById = async (bookId: string): Promise<BookType | null> => {
  return await BookModel.findById(bookId)
}

// Función para obtener libros con filtros
export const getBooksWithFilters = async (filters: Partial<BookType>): Promise<BookType[]> => {
  const query: any = {}

  // Aplica filtros si están presentes
  if (filters.genre) query.genre = filters.genre
  if (filters.publishedDate) query.publishedDate = filters.publishedDate
  if (filters.publisher) query.publisher = filters.publisher
  if (filters.author) query.author = filters.author
  if (filters.title) query.title = { $regex: filters.title, $options: "i" } // Búsqueda parcial por título
  if (typeof filters.isAvailable === 'boolean') query.isAvailable = filters.isAvailable

  return await BookModel.find(query)
}
