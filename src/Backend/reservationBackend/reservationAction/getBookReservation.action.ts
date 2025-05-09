import { ReservationModel, ReservationType } from '../reservationModel/reservation.model'

export const getBookReservationsAction = async (bookId: string): Promise<ReservationType[]> => {
  return await ReservationModel.find({ book: bookId }).populate('user', 'name email') // Incluye el nombre y email del usuario que reservó
}
