import { ReservationModel, ReservationType } from '../reservationModel/reservation.model'

export const getUserReservationsAction = async (userId: string): Promise<ReservationType[]> => {
  return await ReservationModel.find({ user: userId }).populate('book')     // Incluye el nombre y email del usuario que reservó
}


