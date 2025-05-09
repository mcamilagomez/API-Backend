import { BookModel } from "../bookModel/book.model"
import { BookType } from "../bookModel/book.model"

export const updateBookAction = async (bookId: string, updateData: Partial<BookType>): Promise<BookType | null> => {
  return await BookModel.findByIdAndUpdate(bookId, updateData, { new: true })
}
