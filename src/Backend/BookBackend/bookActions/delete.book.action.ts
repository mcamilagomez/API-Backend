import { BookModel } from "../bookModel/book.model"
import { BookType } from "../bookModel/book.model"

export const disableBookAction = async (bookId: string): Promise<BookType | null> => {
  return await BookModel.findByIdAndUpdate(bookId, { isActive: false }, { new: true })
}
