import { Router, Request, Response } from 'express'
import { createReservation } from '../reservationController/reservation.controller'
import { getBookReservations, getUserReservations } from '../reservationController/reservation.controller'
const reservationRoutes = Router()

reservationRoutes.post('/', async (req: Request, res: Response) => {
  const { user, book, reservedAt, returnAt } = req.body

  if (!user || !book || !reservedAt || !returnAt) {
    return res.status(400).json({ message: 'All fields are required: user, book, reservedAt, returnAt' })
  }

  try {
    const newReservation = await createReservation({ user, book, reservedAt, returnAt })
    res.status(201).json({ message: 'Reservation created successfully', reservation: newReservation })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create reservation', error })
  }
})


// Ruta para obtener el historial de reservas de un libro específico
reservationRoutes.get('/book/:bookId', async (req: Request, res: Response) => {
    const { bookId } = req.params
  
    try {
      const reservations = await getBookReservations(bookId)
      if (!reservations.length) {
        return res.status(404).json({ message: 'No reservations found for this book' })
      }
  
      res.status(200).json({ message: 'Reservations retrieved successfully', reservations })
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve reservations', error })
    }
  })
export default reservationRoutes

reservationRoutes.get('/user/:userId', async (req: Request, res: Response) => {
  const { userId } = req.params

  try {
    const reservations = await getUserReservations(userId)
    if (!reservations.length) {
      return res.status(404).json({ message: 'No reservations found for this user' })
    }

    res.status(200).json({ message: 'Reservations retrieved successfully', reservations })
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve reservations', error })
  }
})