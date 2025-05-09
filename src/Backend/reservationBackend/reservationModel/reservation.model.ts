import { Schema, model, Document } from 'mongoose'
import { UserType } from '../../userBackend/userModel/user.model'
import { BookType } from '../../BookBackend/bookModel/book.model'

// Define la interfaz para el modelo de Reserva
interface ReservationType extends Document {
  user: UserType['_id']       // Referencia al ID del usuario
  book: BookType['_id']        // Referencia al ID del libro
  reservedAt: Date             // Fecha de inicio de la reserva
  returnAt: Date               // Fecha de devolución de la reserva
}

// Esquema de Reserva
const ReservationSchema = new Schema<ReservationType>({
  user: {
    type: Schema.Types.String,
    ref: 'User',
    required: true,
  },
  book: {
    type: Schema.Types.String,
    ref: 'Book',
    required: true,
  },
  reservedAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  returnAt: {
    type: Date,
    required: true,
  }
}, {
  timestamps: true, // Añade createdAt y updatedAt automáticamente
  versionKey: false,
})

// Modelo de Reserva
const ReservationModel = model<ReservationType>('Reservation', ReservationSchema)

export { ReservationModel, ReservationType }
