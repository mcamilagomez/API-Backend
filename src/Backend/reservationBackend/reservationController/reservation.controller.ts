import { createReservationAction } from '../reservationAction/reservation.action'
import { ReservationType } from '../reservationModel/reservation.model'
import { getBookReservationsAction } from '../reservationAction/getBookReservation.action'
import { getUserReservationsAction } from '../reservationAction/getUserReservations.action'
export const createReservation = async (reservationData: Partial<ReservationType>): Promise<ReservationType> => {
  return await createReservationAction(reservationData)
}


export const getBookReservations = async (bookId: string): Promise<ReservationType[]> => {
    return await getBookReservationsAction(bookId)
  }


export const getUserReservations = async (userId: string): Promise<ReservationType[]> => {
    return await getUserReservationsAction(userId)
}