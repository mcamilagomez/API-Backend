import { ReservationModel, ReservationType } from '../reservationModel/reservation.model'
//Crear reserva
export const createReservationAction = async (reservationData: Partial<ReservationType>): Promise<ReservationType> => {
    const newReservation = new ReservationModel(reservationData)
    return await newReservation.save()
}
