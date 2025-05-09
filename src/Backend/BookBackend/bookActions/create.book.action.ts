import { BookModel } from "../bookModel/book.model"
import { BookType } from "../bookModel/book.model"

export async function createBookAction(bookData: BookType): Promise<BookType> {
  const book = new BookModel(bookData)
  await book.save()
  return book
}
